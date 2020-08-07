import { Actor, dump } from "./src";
import mermaid from "mermaid";
const alice = new Actor("Alice");
const bob = new Actor("Bob");
const yamada = new Actor("Yamada");
alice.postSyncMessage("hello").to(bob);
bob.postSyncMessage("hello").to(alice);
yamada.postSyncMessage("hihi").to(bob);

const txt = dump(alice, bob, yamada);
mermaid.initialize({
  securityLevel: "loose",
});
mermaid.render("mermaid-svg", txt, (code) => {
  document.getElementById("mermaid").innerHTML = code;
});
