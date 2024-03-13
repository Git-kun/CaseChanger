chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: "convertText",
    title: "変換します",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tabs) {
  if (info.menuItemId === "convertText") {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: showInformation
    });
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

// ウェブページ上に情報を表示する関数
function showInformation() {
  const div = document.createElement('div');
  div.style.position = 'fixed';
  div.style.top = '10px';
  div.style.right = '10px';
  div.style.backgroundColor = 'white';
  div.style.border = '1px solid black';
  div.style.padding = '10px';
  div.textContent = 'ここに情報を表示します。ショートカット設定は chrome://extensions/shortcuts で行えます。';
  document.body.appendChild(div);

  // 数秒後に自動的に消えるように設定することも可能
  setTimeout(() => div.remove(), 5000);
}