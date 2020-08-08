const MessageType = {
  SYNC: "sync",
  REPLY: "reply",
} as const;

const NotePosition = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export { MessageType, NotePosition };
