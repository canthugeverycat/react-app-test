import React, {
    useEffect,
    useState,
} from "react";

import getEmailsFromFiles from '../../helpers/getEmailsFromFiles';

import FileIcon from '../../media/icon-file-outline.svg';
import './index.scss';

/**
 * Renders a preview of a file with
 * number of unique emails inside the file
 *
 * @param {File} file  A File object
 */
const FilePreview = ({file}) => {
    const [count, setCount] = useState();

    useEffect(() => {
        const calculateAndSetCount = async () => {
            const emails = await getEmailsFromFiles(file);
            setCount(emails.length);
        };
        calculateAndSetCount();
    }, [file]);

    return (
        <div className="app__file-preview">
            <img alt="File icon" src={FileIcon} />
            <p className="app__file-preview__title">{file.name}</p>
            <p className="app__file-preview__count">{count} unique email addresses</p>
        </div>
    );
};

export default FilePreview;