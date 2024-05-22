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

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

      chrome.tabs.sendMessage(tabs[0].id, {action: "convertText", text: info.selectionText}, function(response) {
      });
    });
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