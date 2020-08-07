import { MessageType, SequenceCounter } from "./index";

type RecordType = "participant" | MessageType;

type Record = {
  type: RecordType;
  action: string;
  seq: number;
  timestamp: number;
};

export default class Actor {
  private _tmpMessage: { type: MessageType; text: string } | null;
  records: Record[];
  constructor(readonly name: string) {
    this.records = [];
    this._tmpMessage = null;
    this._flush();
    this._set("participant", `participant ${name}`);
  }
  sendMessage(text: string, type: MessageType): this {
    if (this._tmpMessage) throw new Error("Cannot call sendMessage() twice");
    this._tmpMessage = {
      type,
      text,
    };
    return this;
  }
  to(actor: Actor): void {
    if (!this._tmpMessage) throw new Error("Call sendMessage() firstly.");
    this._set(
      this._tmpMessage.type,
      `${this.name}${this._getAllow(this._tmpMessage.type)}${actor.name}: ${
        this._tmpMessage.text
      }`
    );
    this._tmpMessage = null;
  }
  private _set(type: RecordType, v: string): void {
    const d: Record = {
      type,
      action: v,
      seq: SequenceCounter.getNum(),
      timestamp: new Date().getTime(),
    };
    this.records.push(d);
  }

  private _getAllow(type: MessageType): string {
    switch (type) {
      case MessageType.SYNC_MESSAGE:
        return "->>";
      case MessageType.REPLY_MESSAGE:
        return "-->>";
      default:
        throw new Error("No such message type");
    }
  }

  private _flush(): void {
    // sessionStorage.removeItem(sesstionKey);
  }
}
