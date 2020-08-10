let conns = [];

chrome.runtime.onConnect.addListener((port) => {
  const extensionListener = (message, sender, sendResnponse) => {
    if (message.name === "init") {
      conns.push({ ...message, ...{ port } });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, message, (res) => {
          port.postMessage(res);
        });
      });
    }
  };
  port.onMessage.addListener(extensionListener);
  port.onDisconnect.addListener((port) => {
    port.onMessage.removeListener(extensionListener);
    conns = conns.filter((conn) => conn.port !== port);
  });
});
