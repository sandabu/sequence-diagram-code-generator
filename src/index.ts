import { v4 as uuid } from "uuid";

const sesstionKey = "chrm_ext_seq";
enum MessageType {
  PARTICIPANT = "participant",
  SYNC_MESSAGE = "sync_message",
}

type Record = {
  type: MessageType;
  action: string;
  timestamp: number;
};
class Actor {
  private readonly _allMessages: MessageType[];
  private _tmpMessage?: { type: MessageType; text: string };
  records: Record[];
  constructor(readonly name: string) {
    this.records = [];
    this._allMessages = [MessageType.PARTICIPANT, MessageType.SYNC_MESSAGE];
    this._flush();
    this._set(MessageType.PARTICIPANT, `participant ${name}`);
  }
  postSyncMessage(text: string): this {
    this._tmpMessage = {
      type: MessageType.SYNC_MESSAGE,
      text,
    };
    return this;
  }
  to(actor: Actor): void {
    if (!this._tmpMessage) throw new Error("call message function firstly.");
    this._set(
      this._tmpMessage.type,
      `${this.name}->>${actor.name}: ${this._tmpMessage.text}`
    );
  }
  _set(type: MessageType, v: string): void {
    const d: Record = {
      type,
      action: v,
      timestamp: new Date().getTime(),
    };
    this.records.push(d);
  }

  _flush(): void {
    sessionStorage.removeItem(sesstionKey);
  }

  _dump() {
    `sequenceDiagram`;
  }
}

const dump = (...actors: Actor[]): string => {
  const str = restructure(actors);
  console.log(str);
  return `sequenceDiagram
${str}`;
};

const restructure = (actors: Actor[]): string => {
  const all = actors.map((actor) => actor.records).flat();
  let res = "";
  const participants = all
    .filter((r) => r.type === MessageType.PARTICIPANT)
    .map((r) => r.action)
    .reduce(
      (prev, current) =>
        `${prev}
${current}

`
    );
  const actions = all
    .sort((a, b) => a.timestamp - b.timestamp)
    .filter((r) => r.type !== MessageType.PARTICIPANT)
    .map((r) => r.action)
    .reduce(
      (prev, current) =>
        `${prev}
${current}`
    );

  res += participants;
  res += actions;
  return res;
};

export { Actor, dump };
