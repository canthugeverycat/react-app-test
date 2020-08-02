import React, {useState} from "react";

import validateTextFileTypes from '../../helpers/validateTextFileTypes';
import FilePreview from '../FilePreview';

import './index.scss';

/**
 * Renders text file input with drag and drop and the selected files
 * 
 * @param {string} name Identifier to connect label and input element
 * @param {Array.<File>} selectedFiles An array of already selected files
 * @param {Function} onChange Fires to update selectedFiles in its' parent component
 * @param {Object} attributes Optional atttributes to attach to the input element
 */
const TextFileInput = ({
    name = 'file-input',
    selectedFiles = [],
    onChange = () => {},
    ...attributes
}) => {
    // Handles drag and drop state of the drop zone so it can be styled
    const [dndState, setDndState] = useState('');

    const preventDefaultBehavior = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragOver = preventDefaultBehavior;

    const handleDragEnter = e => {
        preventDefaultBehavior(e)
        setDndState('drag-enter');
    };

    const handleDragLeave = e => {
        preventDefaultBehavior(e)
        setDndState('');
    };

    const handleDrop = e => {
        preventDefaultBehavior(e)

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
                accept="text/plain"
                onChange={e => {
                    onChange([...e.target.files]);
                }}
                onClick={(e)=> {
                    // Prevents an issue where onChange wouldn't fire
                    // if you made the same selection again
                    e.target.value = null
                }}
            />

            <label
                htmlFor={name}
                data-dnd-state={dndState}
                onDrop={e => handleDrop(e)}
                onDragOver={e => handleDragOver(e)}
                onDragEnter={e => handleDragEnter(e)}
                onDragLeave={e => handleDragLeave(e)}
            >
                <span>Choose a text file or drag it here</span>
            </label>

            {!!selectedFiles.length && (
                <div className="app__file-input__selected">
                    {selectedFiles.map(file => <FilePreview key={file.name} file={file}/>)}
                </div>
            )}
        </div>
    );
};

export default TextFileInput;