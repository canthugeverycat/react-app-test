/**
 * Copies a text to user's clipboard in any browser
 *
 * @param {string} text Text to be copied
 */
export default function copyToClipboard(text) {
    const textArea = document.createElement('textArea');
    textArea.value = text;
    textArea.style.cssText = "opacity: 0; position: absolute;"
    document.body.appendChild(textArea);

    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}