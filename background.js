chrome.commands.onCommand.addListener(function (command) {
  if (command === "convert-snake-case") {
    convertSelectedTextToSnakeCase();
  } else if (command === "convert-camel-case") {
    convertSelectedTextToCamelCase();
  }
});

function convertSelectedTextToSnakeCase() {
  chrome.tabs.executeScript({
    code: 'window.getSelection().toString().replace(/\\s+/g, "_").toLowerCase();'
  }, function (result) {
    copyToClipboard(result[0]);
  });
}

function convertSelectedTextToCamelCase() {
  chrome.tabs.executeScript({
    code: 'let text = window.getSelection().toString();' +
          'let camelCaseText = text.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {' +
          '  return index == 0 ? word.toLowerCase() : word.toUpperCase();' +
          '}).replace(/\s+/g, "");' +
          'camelCaseText;'
  }, function (result) {
    copyToClipboard(result[0]);
  });
}

function copyToClipboard(text) {
  const copyTextArea = document.createElement("textarea");
  document.body.appendChild(copyTextArea);
  copyTextArea.value = text;
  copyTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(copyTextArea);
}
