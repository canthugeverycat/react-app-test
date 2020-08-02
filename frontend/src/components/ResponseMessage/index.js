import React from "react";

import './index.scss';

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
            {type === 'UPLOAD_SUCCESS' ? 'Emails have been sent!' : errorData.error}

            {/UPLOAD_FAIL_/.test(type) && (
                <ul>
                    {type === 'UPLOAD_FAIL_INVALID' ? (
                        <li>{errorData.email}</li>
                    ) : (
                        errorData.emails.map((email, i) => <li key={i}>{email}</li>)
                    )}
                </ul>
            )}
        </div>
    );
};

export default ResponseMessage;