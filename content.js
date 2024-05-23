chrome.runtime.onMessage.addListener(function(request, sendResponse) {
  if (request.action === "convertText") {
    const selectedText = window.getSelection().toString();
    if (selectedText) {
      sendResponse({text: convertedText});
    }
  }


  if (request.action === 'getSelectedText') {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});
