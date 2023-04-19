chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "convertToCamelCase",
    title: "Convert to Camel Case",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "convertToCamelCase") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: convertToCamelCase,
      args: [info.selectionText],
      callback: function(result) {
        const outputText = result[0];
        chrome.windows.create({
          url: chrome.extension.getURL("popup.html"),
          type: "popup",
          width: 400,
          height: 120
        }, function(window) {
          chrome.runtime.sendMessage({ outputText: outputText }, function(response) {
            console.log(response);
          });
        });
      }
    });
  }
});

function convertToCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
