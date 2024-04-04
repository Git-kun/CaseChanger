document.addEventListener("DOMContentLoaded", function() {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getSelectedText'}, function(response) {
          if (response && response.text) {
              updateTextFields(response.text); // 最初のテキスト変換とフィールド更新
          } else {
              document.getElementById('convertedText').textContent = "テキストが選択されていません";
          }
      });
  });

  document.getElementById('inputText').addEventListener('input', function() {
      updateTextFields(this.value);
  });

  function updateTextFields(text) {
    // 先頭と末尾のスペースを削除
    const trimmedText = text.trim();

    // 変換されたテキストを各フィールドにセット
    document.getElementById('inputText').value = trimmedText;
    document.getElementById("kebabCase").value = toKebabCase(trimmedText);
    document.getElementById("snakeCase").value = toSnakeCase(trimmedText);
    document.getElementById("removeSpaces").value = removeSpaces(trimmedText);
    document.getElementById("toUpperCase").value = toUpperCase(trimmedText);
    document.getElementById("toLowerCase").value = toLowerCase(trimmedText);
    document.getElementById("camelCase").value = toCamelCase(trimmedText);
    document.getElementById("pascalCase").value = toPascalCase(trimmedText);
  }


  function toKebabCase(text) {
    return text
        // 最初にキャメルケースの単語境界をハイフンで分割
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // アンダースコアとスペースをハイフンに置換
        .replace(/[_\s]+/g, '-')
        // 全て小文字に変換
        .toLowerCase();
  }


  function toSnakeCase(text) {
    return text
        // スペース、ハイフン、アンダースコアをアンダースコアに統一
        .replace(/[\s\-]+/g, '_')
        // 大文字の前にアンダースコアを挿入し、キャメルケースを適切に処理
        .replace(/([A-Z])/g, '_$1')
        // 連続するアンダースコアを一つにする
        .replace(/_+/g, '_')
        // 先頭がアンダースコアの場合は削除
        .replace(/^_/, '')
        // 全て小文字に変換
        .toLowerCase();
  }


  function removeSpaces(text) {
      return text.replace(/\s+/g, "");
  }

  function toUpperCase(text) {
      return text.toUpperCase();
  }

  function toLowerCase(text) {
      return text.toLowerCase();
  }

  function toCamelCase(text) {
      // キャメルケース形式のテキストを適切に処理するための追加のチェック
      if (!/[\s-_]/.test(text) && /[A-Z]/.test(text)) {
          // キャメルケース形式のテキストの単語境界を識別
          return text
              .replace(/\.?([A-Z]+)/g, function (x,y){ return " " + y.toLowerCase(); })
              .trim()
              .split(' ')
              .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1))
              .join('');
      } else {
          // 通常のスペース、ハイフン、アンダースコアで区切られているテキストの処理
          return text
              .split(/[\s-_]+/)
              .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('');
      }
  }

  function toPascalCase(text) {
    // まず、キャメルケースの単語境界を識別しやすくするために、
    // 大文字の前にスペースを挿入します（ただし、文字列の先頭は除く）。
    // そして、アンダースコアやハイフンもスペースに置換します。
    const spacedText = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[-_]+/g, ' ');

    // スペースで区切られたテキストをパスカルケースに変換
    return spacedText
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
  }




});
