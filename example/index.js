import { Actor, MessageType, NotePosition, dump } from "../src";
import mermaid from "mermaid";

const alice = new Actor("Alice");
const bob = new Actor("Bob");
const beth = new Actor("Beth");

bob.sendMessage("Hi", "Alice", MessageType.SYNC);
alice.activate();
alice.sendMessage("Think", alice, MessageType.SYNC);
alice.sendMessage("Hello", bob, MessageType.REPLY);
alice.deactivate();

setTimeout(() => {
  alice.writeNoteOver("Why did I say hello...?", alice);
  render();
}, 100);

bob.writeNote("Got Alice's Hello", NotePosition.LEFT);
bob.sendMessage('Hi', beth, MessageType.SYNC);

const render = () => {
  bob.writeNoteOver('Done', alice);
  const txt = dump(bob, alice, beth);
  console.log(txt);
  mermaid.initialize({
    securityLevel: "loose",
  });
  mermaid.render("mermaid-svg", txt, (code) => {
    document.getElementById("mermaid").innerHTML = code;
  });
};
