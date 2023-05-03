// ポップアップが開かれたときに実行される処理
document.addEventListener("DOMContentLoaded", function() {
  // Get Selected Textボタンをクリックしたときの処理
// document.getElementById('btn_get').addEventListener('click', () => {
    chrome.tabs.query( {active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {message: 'getname'}, (content) => {
            if(!content){
                alert('何かテキストを範囲選択してください！');
                return;
            }
            // var content = content.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            var str0 = content.replace(/\s+/g, "-");
            var str1 = content.replace(/\s+/g, "_");
            var str2 = content.replace(/\s+/g, "");
            var str3 = content.toUpperCase();
            var str4 = content.toLowerCase();
            // 処理後の値をdatで表示する
            document.getElementById("dat0").value = str0;
            document.getElementById("dat1").value = str1;
            document.getElementById("dat2").value = str2;
            document.getElementById("dat3").value = str3;
            document.getElementById("dat4").value = str4;
            document.getElementById('title').value = content
            
        });
        
    });
// });
});

// ページがロードされたときに実行される
window.addEventListener('load', function() {
  // title要素を取得する
  var titleElement = document.getElementById('title');
  // output要素を取得する
  var outputElement = document.getElementById('output');

  // title要素の値が変更されたときに実行される関数を定義する
  titleElement.addEventListener('input', function() {
    // 入力されたテキストを取得する
    var text = titleElement.value;

    // キャメルケースに変換する
    var camelCaseText = text.replace(/-([a-z])/g, function(match, p1) {
      return p1.toUpperCase();
    });

    // ケバブケースに変換する
    var kebabCaseText = text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

    // 変換されたテキストを表示する
    console.log('キャメルケース:', camelCaseText);
    console.log('ケバブケース:', kebabCaseText);

    // output要素に変換されたテキストを表示する
    outputElement.textContent = `キャメルケース: ${camelCaseText}, ケバブケース: ${kebabCaseText}`;
  });
});
