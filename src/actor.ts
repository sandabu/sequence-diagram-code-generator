import { MessageType, NotePosition } from "./definition";
import Counter from "./counter";

type MessageType = typeof MessageType[keyof typeof MessageType];
type NotePosition = typeof NotePosition[keyof typeof NotePosition];

type RecordType = "participant" | "Note" | MessageType;
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
  sendMessage(text: string, to: Actor, type: MessageType): void;
  sendMessage(text: string, to: string, type: MessageType): void;
  sendMessage(text: string, to: Actor | string, type: MessageType): void {
    const name = typeof to === "string" ? to : to.name;
    this._set(type, `${this.name}${this._getAllow(type)}${name}: ${text}`);
  }
  writeNote(text: string, position: NotePosition): void {
    const leftText = `Note ${position} of ${this.name}: ${text}`;
    this._set("Note", leftText);
  }
  writeNoteOver(text: string, actor: Actor): void {
    const leftText = `Note over ${this.name},${actor.name}: ${text}`;
    this._set("Note", leftText);
  }
  private _set(type: RecordType, v: string): void {
    const d: Record = {
      type,
      action: v,
      seq: Counter.getNum(),
      timestamp: new Date().getTime(),
    };
    this.records.push(d);
  }

  private _getAllow(type: MessageType): string {
    switch (type) {
      case MessageType.SYNC:
        return "->>";
      case MessageType.REPLY:
        return "-->>";
      default:
        throw new Error("No such message type");
    }
  }

  private _flush(): void {
    // sessionStorage.removeItem(sesstionKey);
  }
}
