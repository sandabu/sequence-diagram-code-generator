import { Actor, MessageType, dump } from "./src";
import mermaid from "mermaid";

const momoko = new Actor("Momoko");
const naopi = new Actor("Naopi");

naopi.sendMessage("Hi", MessageType.SYNC_MESSAGE).to(momoko);
momoko.sendMessage("Hello", MessageType.REPLY_MESSAGE).to(naopi);
naopi.sendMessage("Hi", MessageType.SYNC_MESSAGE).to(naopi);

const txt = dump(naopi, momoko);
mermaid.initialize({
  securityLevel: "loose",
});
mermaid.render("mermaid-svg", txt, (code) => {
  document.getElementById("mermaid").innerHTML = code;
});
