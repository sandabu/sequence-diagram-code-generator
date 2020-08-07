import { Lifeline, MessageType, dump } from "./src";
import mermaid from "mermaid";

const momoko = new Lifeline("Momoko");
const naopi = new Lifeline("Naopi");

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
