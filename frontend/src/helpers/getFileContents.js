/**
 * Gets text contents of a file
 *
 * @param {File} file A File object
 *
 * @return {string} Resolves with text content
 */
export default function getFileContents(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            resolve(event.target.result);
        });
        reader.readAsText(file);
    });
}