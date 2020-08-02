import React from "react";


import copyToClipboard from '../../helpers/copyToClipboard';

import './index.scss';

/**
 * Responsible for displaying a response message from the API
 * 
 * @param {string} type Action type based on the response received
 * @param {Object|null} errorData Response from the API if an error occurred
 */
const ResponseMessage = ({
    type,
    errorData,
}) => {
    const classModifier = (() => {
        switch (type) {
            case 'UPLOAD_SUCCESS':
                return 'success';
            case 'UPLOAD_FAIL_SOME':
                return 'warning';
            case 'UPLOAD_FAIL_INVALID':
                return 'error';
            default:
                return '';
        }
    })();

    if (!type) {
        return null;
    }

    return (
        <div className={`app__response app__response--${classModifier}`}>
            {type === 'UPLOAD_SUCCESS' ? 'Emails have been sent' : errorData.error}

            {/UPLOAD_FAIL_/.test(type) && (
                <>
                    <ul>
                        {type === 'UPLOAD_FAIL_INVALID' ? (
                            <li>{errorData.email}</li>
                        ) : (
                            errorData.emails.map((email, i) => <li key={i}>{email}</li>)
                        )}
                    </ul>
                    {!!errorData.emails && (
                        <button
                            className="btn btn--small"
                            type="button"
                            onClick={() => copyToClipboard(errorData.emails.join('\n'))}
                        >
                            COPY EMAILS
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default ResponseMessage;