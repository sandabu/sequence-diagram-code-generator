import { MessageType, NotePosition } from "./definition";
declare type MessageType = typeof MessageType[keyof typeof MessageType];
declare type NotePosition = typeof NotePosition[keyof typeof NotePosition];
declare type RecordType = "participant" | "Note" | "activate" | "deactivate" | MessageType;
declare type Record = {
    type: RecordType;
    action: string;
    seq: number;
    timestamp: number;
};
export default class Actor {
    readonly name: string;
    records: Record[];
    constructor(name: string);
    sendMessage(text: string, to: Actor, type: MessageType): void;
    sendMessage(text: string, to: string, type: MessageType): void;
    writeNote(text: string, position: NotePosition): void;
    writeNoteOver(text: string, actor: Actor): void;
    activate(): void;
    deactivate(): void;
    private _set;
    private _getAllow;
    private _flush;
}
export {};
