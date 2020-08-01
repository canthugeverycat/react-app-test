import React, {
  useReducer,
  useCallback,
} from 'react';

import TextFileInput from './components/TextFileInput';

import reducer from './helpers/reducer';

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

  const handleResponse = useCallback(async (res) => {
    const errorData = res.status === 200 ? null : await res.json();

    const actions = {
      200: {type: 'UPLOAD_SUCCESS'},
      422: {type: 'UPLOAD_FAIL_INVALID', errorData},
      500: {type: 'UPLOAD_FAIL_SOME', errorData},
    };

    dispatch(actions[res.status]);
  }, []);

  const handleOnSubmit = useCallback(async (e) => {
    e.preventDefault();

    dispatch({type: 'UPLOAD'});

    let emails = [];

    for (let i = 0; i < state.selectedFiles.length; i++) {
      let text = await state.selectedFiles[i].text();
      text = text.split('\n').filter(line => line.length);

      emails.push(text);
    }
    emails = emails.flat();

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emails }),
    };
    const result = await fetch('https://frontend-homework.togglhire.vercel.app/api/send', options);
    handleResponse(result);
  }, [state.selectedFiles, handleResponse]);

  return (
    <div className="app">
      <form onSubmit={handleOnSubmit}>

        <h2>MAIL-O-MATIC-2000</h2>

        <TextFileInput
          name="app__file-input"
          selectedFiles={state.selectedFiles}
          onChange={(files) => {
            if (files.length) {
              dispatch({type: 'SELECT_FILES', files});
            }
          }}
          multiple
        />

        <button
          type="submit"
          className={`btn ${state.isLoading ? 'btn--loading' : ''}`}
          disabled={!state.selectedFiles.length || state.isLoading}
        >
          Upload
        </button>

        {state.resType === 'UPLOAD_SUCCESS' && (
          <div className="app__response app__response--success">
            Emails have been sent!
          </div>
        )}
        
        {/UPLOAD_FAIL_/.test(state.resType) && (
          <div className={`app__response app__response${state.resType === 'UPLOAD_FAIL_INVALID' ? '--error' : '--warning'}`}>
            {state.errorData.error}
            <ul>
              {state.resType === 'UPLOAD_FAIL_INVALID' ? (
                <li>{state.errorData.email}</li>
              ) : (
                state.errorData.emails.map(email => <li>{email}</li>)
              )}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
