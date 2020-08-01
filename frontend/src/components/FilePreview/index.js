import React, {
    useEffect,
    useState,
} from "react";

import FileIcon from '../../media/icon-file-outline.svg';

import './index.scss';

const FilePreview = ({file}) => {
    const [count, setCount] = useState();

    useEffect(() => {
        const calculateAndSetCount = async () => {
            const content = await file.text();
            const count = content.split('\n').filter(line => line.length).length;
            setCount(count);
        };
        
        calculateAndSetCount();
    }, [file]);

    return (
        <div className="app__file-preview">
            <img alt="File icon" src={FileIcon} />
            <p className="app__file-preview__title">{file.name}</p>
            <p className="app__file-preview__count">{count} email addresses</p>
        </div>
    );
};

export default FilePreview;