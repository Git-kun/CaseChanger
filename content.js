chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "convertText") {
    const selectedText = window.getSelection().toString();
    console.log('テスト出力', selectedText)
    if (selectedText) {
      console.log('テスト出力2', selectedText)

      // 変換結果を送信元（ポップアップなど）に返します。
      sendResponse({text: convertedText});
    }
  }


  if (request.action === 'getSelectedText') {
    console.log("リクエスト届いた:");
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });

      
    // // 選択されているテキストがあればそれを応答として返す
    // if (selectedText) {
    //   sendResponse(selectedText);
    // } else {
    //   // 選択されているテキストがない場合は、適切な応答を返す
    //   sendResponse('テキストが選択されていません。');
    // }
    
    // 非同期応答を許可するために true を返す
    // return true;
  }
});
