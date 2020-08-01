export default function validateTextFileTypes(f) {
    const files = [...f];
    const invalidFiles = files.filter(file => file.type !== 'text/plain');

    return !!!invalidFiles.length;
}