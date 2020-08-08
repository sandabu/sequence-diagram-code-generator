import { Actor, MessageType, NotePosition, dump } from "./src";
import mermaid from "mermaid";

const momoko = new Actor("Momoko");
const naopi = new Actor("Naopi");

naopi.sendMessage("Hi", MessageType.SYNC).to(momoko);
momoko.sendMessage("Hello", MessageType.REPLY).to(naopi);
momoko.writeNoteOver("Why did I say hello...?", momoko);
naopi.sendMessage("Hi", MessageType.SYNC).to(naopi);

const txt = dump(naopi, momoko);
mermaid.initialize({
  securityLevel: "loose",
});
mermaid.render("mermaid-svg", txt, (code) => {
  document.getElementById("mermaid").innerHTML = code;
});
