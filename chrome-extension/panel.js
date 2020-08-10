const conn = chrome.runtime.connect({
  name: "panel",
});

conn.postMessage({
  name: "init",
  tabId: chrome.devtools.inspectedWindow.tabId,
});

document.getElementById("js-btn-render").onclick = () => {
  const msg = {
    name: "requestSessionItem",
  };
  conn.postMessage(msg);
};

// document.getElementById("js-btn-flush").onclick = () => {
//   const msg = {
//     name: "flushSessionItem",
//   };
//   conn.postMessage(msg);
// };

document.getElementById("js-btn-render-from-inline").onclick = () => {
  const $textarea = document.querySelector('textarea[name="render-inline"]');
  const code = 'sequenceDiagram\n' + $textarea.value
  mermaid.render("mermaid-svg", code, (html) => {
    document.getElementById("mermaid").innerHTML = html;
  });
};

conn.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  if (message.type === "requestSessionItem") {
    mermaid.render("mermaid-svg", message.diagram, (html) => {
      document.getElementById("mermaid").innerHTML = html;
    });
  } else if (message.type === "flushSessionItem") {
    document.getElementById("mermaid").innerHTML = "";
  }
});

mermaid.initialize({
  securityLevel: "loose",
});
