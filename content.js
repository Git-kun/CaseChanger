chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  // let title = document.querySelector('.style-bw4dop').textContent

  // 選択されたテキストを取得

  let title = window.getSelection().toString();

  // 取得したテキストが空でない場合、sendResponseで返す
  if (title !== '') {
    sendResponse(title);
  }
});
