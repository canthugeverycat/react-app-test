/**
 * Check is any of the Files in an array are of a text/plain type
 * This is used to validate drag and dropped files
 *
 * @param {Array<File>} f Array of File objects
 *
 * @return {boolean} If any of the files are invalid, returns false
 */
export default function validateTextFileTypes(f) {
    const files = [...f];
    const invalidFiles = files.filter(file => file.type !== 'text/plain');

    return !!!invalidFiles.length;
}