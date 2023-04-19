function convertToCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

function setOutputText() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(tabs[0].id, { code: "window.getSelection().toString();" }, function(selection) {
      if (selection.length > 0) {
        const inputText = selection[0];
        const outputText = convertToCamelCase(inputText);
        document.getElementById("input-text").value = inputText;
        document.getElementById("output-text").value = outputText;
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", function() {
  setOutputText();
  document.getElementById("input-text").addEventListener("input", function() {
    const inputText = document.getElementById("input-text").value;
    const outputText = convertToCamelCase(inputText);
    document.getElementById("output-text").value = outputText;
  });
});

chrome.commands.onCommand.addListener(function(command) {
  if (command === "convert_to_camel_case") {
    setOutputText();
    chrome.tabs.create({ url: chrome.extension.getURL("popup.html"), type: "popup" });
  }
});
