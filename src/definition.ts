const MessageType = {
  SYNC: "Message_Sync",
  REPLY: "Message_Reply",
} as const;

const NotePosition = {
  LEFT: "left",
  RIGHT: "right",
} as const;

export { MessageType, NotePosition };
