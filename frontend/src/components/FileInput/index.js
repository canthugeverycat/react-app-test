import React from "react";

import './index.css';

const FileInput = ({
    name = 'file-input',
    selectedFiles,
    onChange = () => {},
    ...attributes
}) => (
    <div className="app__file-input">
        <input
            id={name}
            {...attributes}
            type="file"
            onChange={e => {
                onChange([...e.target.files]);
            }}
        />
        <label htmlFor={name}>
            Select files to upload or drag them over here
        </label>

        {Boolean(selectedFiles.length) && (
            <div className="app__file-input__selected">
                {selectedFiles.map(f => f.name).join(", ")}
            </div>
        )}
    </div>
);

export default FileInput;