import Lifeline from "./lifeline";

enum MessageType {
  SYNC_MESSAGE,
  REPLY_MESSAGE,
}

class SequenceCounter {
  private static _num = 0;
  static getNum(): number {
    return this._num++;
  }
}

const dump = (...lifelines: Lifeline[]): string => {
  const str = restructure(lifelines);
  console.log(str);
  return `sequenceDiagram
${str}`;
};

const restructure = (lifelines: Lifeline[]): string => {
  const all = lifelines.map((lifeline) => lifeline.records).flat();
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

export { Lifeline, MessageType, SequenceCounter, dump };
