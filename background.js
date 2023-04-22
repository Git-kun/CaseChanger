function convertToCamelCase(text) {
  // Convert text to CamelCase
  return text;
}

chrome.commands.onCommand.addListener(function(command) {
  if (command == "convert_to_camel_case") {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: "getSelection"}, function(response) {
        var selectedText = response.text;
        var convertedText = convertToCamelCase(selectedText);
        alert(convertedText);
      });
    });
  }
});
