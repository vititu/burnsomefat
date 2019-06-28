import React from 'react';
const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;

function Message() {
  const closeWindow = () => ipcRenderer.send('hide-message');

  return (
    <React.Fragment>
      <button onClick={closeWindow}>Close</button>
      <h1>Vai, garotim!</h1>
    </React.Fragment>
  );
}

export default Message;
