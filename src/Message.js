import React from 'react';
import { ReactComponent as Text } from './images/text.svg';
import dog from './images/ropejump.gif';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

function Message() {
  const closeWindow = () => ipcRenderer.send('hide-message');

  return (
    <div className="box">
      <img width="200" height="200" src={dog} alt="" />
      <Text />
      <button className="close" onClick={closeWindow}>
        Job done!
      </button>
    </div>
  );
}

export default Message;
