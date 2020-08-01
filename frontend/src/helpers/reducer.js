export default function reducer(state, action) {
    switch (action.type) {
        case 'SELECT_FILES':
            return {
                ...state,
                selectedFiles: action.files,
                resType: '',
                errorData: null,
                // resType: 'UPLOAD_FAIL_INVALID',
                // errorData: {
                //     "error": "Failed to send emails to some addresses",
                //     "emails": [
                //       "ucamacho@example.net",
                //       "matthaeiarnold@example.com",
                //       "harrietheser@example.org"
                //     ]
                //   },
            };
        case 'UPLOAD':
            return {
                ...state,
                isLoading: true,
                resType: '',
                errorData: null,
            };
        case 'UPLOAD_SUCCESS':
            return {
                ...state,
                isLoading: false,
                resType: action.type,
                selectedFiles: [],
                errorData: null,
            };
        case 'UPLOAD_FAIL_SOME':
        case 'UPLOAD_FAIL_INVALID':
            return {
                ...state,
                isLoading: false,
                resType: action.type,
                errorData: action.errorData
            };
        default:
            return state;
    }
};
