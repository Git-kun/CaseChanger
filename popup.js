// ポップアップが開かれたときに実行される処理
document.addEventListener("DOMContentLoaded", function() {

  // Get Selected Textボタンをクリックしたときの処理
// document.getElementById('btn_get').addEventListener('click', () => {

    chrome.tabs.query( {active:true, currentWindow:true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'getSelectedText'}, function(response) {

            if (response && response.text) {
                // テキストを変換する関数を呼び出し
                const convertedText = response.text;
                console.log('選択したテキストを取得！！')
                // 変換したテキストをポップアップに表示
                // document.getElementById('convertedText').textContent = convertedText;
                // document.getElementById("dat2").value = convertedText;
            } else {
                // テキストが取得できなかった場合のメッセージ
                document.getElementById('convertedText').textContent = "テキストが選択されていません";
            }

            // document.getElementById('convertedText').textContent = response ? response.text : "テキストが選択されていません";

            text = response.text;

            text = text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
            str0 = text.replace(/\s+/g, "-");
            str1 = text.replace(/\s+/g, "_");
            str2 = text.replace(/\s+/g, "");
            str3 = text.toUpperCase(); //全て大文字に変換
            str4 = text.toLowerCase(); //全て小文字に変換
            // 処理後の値をdatで表示する
            document.getElementById("dat0").value = str0;
            document.getElementById("dat1").value = str1;
            document.getElementById("dat2").value = str2;
            document.getElementById("dat3").value = str3;
            document.getElementById("dat4").value = text;
            document.getElementById('title').value = text
            
        });
        
    });
// });
});


// キャメルケースやスペース区切りのテキストをスネークケースに変換する関数
// function toSnakeCase(str) {
//   return str
//       // スペースをアンダースコアに置換
//       .replace(/\s+/g, '_')
//       // キャメルケースをスネークケースに置換
//       .replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();})
//       // 複数のアンダースコアを一つに置換
//       .replace(/_+/g, '_')
//       // 先頭のアンダースコアを削除
//       .replace(/^_/, '');
// }

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
