import { Actor, MessageType, NotePosition, dump } from "../src";
import mermaid from "mermaid";

const alice = new Actor("Alice");
const bob = new Actor("Aob");

bob.sendMessage("Hi", "Alice", MessageType.SYNC);
alice.activate();
alice.sendMessage("Think", alice, MessageType.SYNC);
alice.sendMessage("Hello", bob, MessageType.REPLY);
alice.deactivate();

setTimeout(() => {
  bob.writeNote("Hummmm...", NotePosition.LEFT);
  render();
}, 100);

alice.writeNoteOver("Why did I say hello...?", alice);

const render = () => {
  const txt = dump(bob, alice);
  mermaid.initialize({
    securityLevel: "loose",
  });
  mermaid.render("mermaid-svg", txt, (code) => {
    document.getElementById("mermaid").innerHTML = code;
  });
};
