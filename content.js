chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "getSelection") {
    var selectedText = window.getSelection().toString();
    sendResponse({text: selectedText});
  }
});
