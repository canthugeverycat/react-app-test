import React, {
  useState,
} from 'react';

import TextFileInput from './components/TextFileInput';

export function App(props) {
  const [selectedFiles, setSelectedFiles] = useState([]);

  return (
    <div className="app">
      <form>
        <TextFileInput
          name="app__input-files"
          selectedFiles={selectedFiles}
          onChange={(files) => {
            console.log(files);
            setSelectedFiles(files);
          }}
          multiple
        />

        <button type="submit">Upload</button>

        <div>Emails sent successfully!</div>

        <div>There was an error: Failed to send emails to some addresses</div>
        <ul>
          <li>firstitem.txt</li>
          <li>seconditem.txt</li>
        </ul>
      </form>
    </div>
  );
}

export default App;
