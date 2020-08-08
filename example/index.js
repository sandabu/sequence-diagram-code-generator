import { Actor, MessageType, NotePosition, dump } from "../src";
import mermaid from "mermaid";

const momoko = new Actor("Momoko");
const naopi = new Actor("Naopi");

naopi.sendMessage("Hi", "Momoko", MessageType.SYNC);
momoko.sendMessage("Hello", naopi, MessageType.REPLY);
setTimeout(() => {
  naopi.writeNote("Hummmm...", NotePosition.LEFT);
  render();
}, 100);

momoko.writeNoteOver("Why did I say hello...?", momoko);

const render = () => {
  const txt = dump(naopi, momoko);
  mermaid.initialize({
    securityLevel: "loose",
  });
  mermaid.render("mermaid-svg", txt, (code) => {
    document.getElementById("mermaid").innerHTML = code;
  });
};
