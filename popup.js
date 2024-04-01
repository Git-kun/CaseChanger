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
      document.getElementById('inputText').value = text;
      document.getElementById("kebabCase").value = toKebabCase(text);
      document.getElementById("snakeCase").value = toSnakeCase(text);
      document.getElementById("removeSpaces").value = removeSpaces(text);
      document.getElementById("toUpperCase").value = toUpperCase(text);
      document.getElementById("toLowerCase").value = toLowerCase(text);
      document.getElementById("camelCase").value = toCamelCase(text);
  }

  function toKebabCase(text) {
      return text.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase().replace(/\s+/g, "-");
  }

  function toSnakeCase(text) {
      return text.replace(/\s+/g, "_");
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
      return text
          .split(/[\s-_]+/)
          .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('');
  }
});
