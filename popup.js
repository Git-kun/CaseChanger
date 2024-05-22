document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'getSelectedText' }, function (response) {
            if (response && response.text) {
                updateTextFields(response.text);
            }
        });
    });

    document.getElementById('inputText').addEventListener('input', function () {
        updateTextFields(this.value);
    });

    function updateTextFields(text) {
        const trimmedText = text.trim();
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
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[_\s]+/g, '-')
            .toLowerCase();
    }


    function toSnakeCase(text) {
        return text
            .replace(/[\s\-]+/g, '_')
            .replace(/([A-Z])/g, '_$1')
            .replace(/_+/g, '_')
            .replace(/^_/, '')
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
        if (!/[\s-_]/.test(text) && /[A-Z]/.test(text)) {
            return text
                .replace(/\.?([A-Z]+)/g, function (x, y) { return " " + y.toLowerCase(); })
                .trim()
                .split(' ')
                .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1))
                .join('');
        } else {
            return text
                .split(/[\s-_]+/)
                .map((word, index) => index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join('');
        }
    }

    function toPascalCase(text) {
        const spacedText = text
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/[-_]+/g, ' ');

        return spacedText
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    }
});
