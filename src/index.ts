import Actor from "./actor";

const MessageType = {
  SYNC_MESSAGE: "sync_message",
  REPLY_MESSAGE: "reply_message",
} as const;

const NotePosition = {
  LEFT: "left",
  RIGHT: "right",
  OVER: "over",
} as const;

class SequenceCounter {
  private static _num = 0;
  static getNum(): number {
    return this._num++;
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
    .filter((r) => r.type === "participant")
    .map((r) => r.action)
    .reduce((prev, current) => prev + "\n" + current + "\n\n");
  console.log(all.filter((r) => r.type !== "participant"));
  const actions = all
    .filter((r) => r.type !== "participant")
    .sort((a, b) => a.seq - b.seq)
    .map((r) => r.action)
    .reduce((prev, current) => prev + "\n" + current);

  res += participants;
  res += actions;
  return res;
};

export { Actor, MessageType, NotePosition, SequenceCounter, dump };
