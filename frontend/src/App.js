import React from 'react';

export function App(props) {
  return (
    <div className="app">
      <form>
        <input
          name="emails"
          type="file"
          accept=".txt"
          multiple
        />

        <ul className="app__selected-files">
          <li>firstitem.txt</li>
          <li>seconditem.txt</li>
          <li>thirditem.txt</li>
        </ul>

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
