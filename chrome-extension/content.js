chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const sessKey = "seq_diagram";
  const msg = {
    type: request.name,
    diagram: "",
  };
  if (request.name === "requestSessionItem") {
    msg.diagram = sessionStorage.getItem(sessKey);
  } else if (request.name === "flushSessionItem") {
    sessionStorage.removeItem(sessKey);
  }
  callback(msg);
});
