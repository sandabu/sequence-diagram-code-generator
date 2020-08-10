import { MessageType, NotePosition } from "./definition";
import Actor from "./actor";

const dump = (...actors: Actor[]): string => {
  if (actors.length === 0) return ""
  const str = restructure(actors);
  const res = 'sequenceDiagram' + '\n' + indent(str);
  sessionStorage.setItem('seq_diagram', res);
  return res;
};

const restructure = (actors: Actor[]): string => {
  const all = actors.map((actor) => actor.records).flat();
  let res = "";
  const participants = all
    .filter((r) => r.type === "participant")
    .map((r) => r.action)
    .reduce((prev, current) => prev + "\n" + current + "\n\n");
  const actions = all
    .filter((r) => r.type !== "participant")
    .sort((a, b) => a.seq - b.seq)
    .map((r) => r.action)
    .reduce((prev, current) => prev + "\n" + current);

  res += participants;
  res += actions;
  return res;
};

const indent = (text: string) => {
  return text.split('\n').map((s) => '\t' + s).reduce((prev, current) => prev + '\n' + current)
}

export { Actor, MessageType, NotePosition, dump };
