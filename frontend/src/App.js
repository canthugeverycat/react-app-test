import React, {
  useReducer,
  useCallback,
} from 'react';

import TextFileInput from './components/TextFileInput';
import ResponseMessage from './components/ResponseMessage';

import reducer from './helpers/reducer';
import getEmailsFromFiles from './helpers/getEmailsFromFiles';

/**
 * Main container for the app, a wireframe.
 * This is where smaller components are rendered,
 * and main state and logic for sending emails are housed
 */
export function App() {
  const [state, dispatch] = useReducer(
    reducer,
    {
      selectedFiles: [],
      isLoading: false,
      resType: '',
      errorData: null,
    },
  );

  /**
   * Handles the response from the API
   * and dispatches a proper action
   *
   * @param {Response} res Response object
   */
  const handleResponse = useCallback(async (res) => {
    const errorData = res.status === 200 ? null : await res.json();

    const actions = {
      200: {type: 'UPLOAD_SUCCESS'},
      422: {type: 'UPLOAD_FAIL_INVALID', errorData},
      500: {type: 'UPLOAD_FAIL_SOME', errorData},
    };

    dispatch(actions[res.status]);
  }, []);

  /**
   * Parses emails from selected files,
   * removes any duplicates and sends it to the API
   *
   * @param {Event} e Event object from 'submit' event
   */
  const handleOnSubmit = useCallback(async (e) => {
    e.preventDefault();

    dispatch({type: 'UPLOAD'});

    const emails = await getEmailsFromFiles(state.selectedFiles);

    const response = await fetch(
      'https://frontend-homework.togglhire.vercel.app/api/send',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
      }
    );
    handleResponse(response);
  }, [state.selectedFiles, handleResponse]);

  return (
    <div className="app">
      <form onSubmit={handleOnSubmit} >

        <h2>MAIL-O-MATIC-2000</h2>

        <TextFileInput
          name="app__file-input"
          multiple
          selectedFiles={state.selectedFiles}
          onChange={(files) => {
            // Prevents if user presses cancel on file window
            if (files.length) {
              dispatch({type: 'SELECT_FILES', files});
            }
          }}
        />

        <button
          type="submit"
          className={`btn ${state.isLoading ? 'btn--loading' : ''}`}
          disabled={!state.selectedFiles.length || state.isLoading}
        >
          Upload
        </button>

        <ResponseMessage type={state.resType} errorData={state.errorData} />
      </form>
    </div>
  );
}

export default App;
