import getFileContents from './getFileContents';
import removeDuplicates from './removeDuplicates';

export default function getEmailsFromFiles(files) {
    const data = Array.isArray(files) ? files : [files];
    return new Promise(async (resolve, reject) => {
        let emails = [];

        for (let i = 0; i < data.length; i++) {
            let text = await getFileContents(data[i]);
            text = text.split('\n').filter(line => line.length);

            emails.push(text);
        }
        emails = removeDuplicates(emails.flat());
        
        resolve(emails);
    })
}