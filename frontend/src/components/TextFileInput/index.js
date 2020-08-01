import React, {useState} from "react";

import validateTextFileTypes from '../../helpers/validateTextFileTypes';
import FilePreview from '../FilePreview';

import './index.css';

const TextFileInput = ({
    name = 'file-input',
    selectedFiles = [],
    onChange = () => {},
    ...attributes
}) => {
    const [dndState, setDndState] = useState('');

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();

        setDndState('drag-enter');
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();

        setDndState('');
    };

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        const areFilesValid = validateTextFileTypes(e.dataTransfer.files);

        if (areFilesValid) {
            setDndState('drop');
            onChange([...e.dataTransfer.files]);
        } else {
            setDndState('drop-invalid');
        }
    };

    return (
        <div className="app__file-input">
            <input
                id={name}
                {...attributes}
                type="file"
                onChange={e => {
                    onChange([...e.target.files]);
                }}
                accept="text/plain"
            />

            <label
                htmlFor={name}
                data-dnd-state={dndState}
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
            >
                Select files to upload or drag them over here
            </label>

            {!!selectedFiles.length && (
                <div className="app__file-input__selected">
                    {selectedFiles.map((file, i) => <FilePreview file={file} key={i}/>)}
                </div>
            )}
        </div>
    );
};

export default TextFileInput;