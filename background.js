chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "convertText",
    title: "変換します",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tabs) {
  if (info.menuItemId === "convertText") {
    
    var selection_text = info.selectionText;
    console.log(selection_text, '選択したテキスト');
    // chrome.tabs.sendMessage(tabs[0], { 
    //   name: 'selection_text',
    //   data: {
    //     selection_text
    //   }
    // });

    


    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      // chrome.tabs.sendMessage(tabs[0].id, {
      //   action: 'convertText',
      //   name: 'displayUrl:contentScripts',
      //   data: {
      //     url
      //   }
      // }, function(response) {
      //   console.log('こんてんとへ出力')
      // });
      chrome.tabs.sendMessage(tabs[0].id, {action: "convertText", text: info.selectionText}, function(response) {
        console.log("変換結果:", response);
        // 応答を処理するコードをここに記述します。
        // 例えば、ポップアップに結果を表示する等。
      });
    });

    // chrome.tabs.sendMessage(tab[0].id, {text: selection_text}, function(response) {
    //   console.log('テスト出力');
    // });


    // chrome.scripting.executeScript({
    //   target: {tabId: tab.id},
    //   files: ['content.js']
    // });


  }
});