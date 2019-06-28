import React, { useEffect, useState } from 'react';
const electron = window.require('electron');

const ipcRenderer = electron.ipcRenderer;

// Add an hour from 10:30 to 18:30
const HOURS = Array(9)
  .fill(10)
  .map((hour, index) => `${hour + index}:30`);

const INITIAL_STATE = HOURS.reduce((acc, hour) => {
  acc = { ...acc, [hour]: false };
  return acc;
}, {});

// Get the last time in HOURS array and add 1 hour
const getResetTime = () => {
  const lastTime = HOURS[HOURS.length - 1];
  const timeArray = lastTime.split(':');
  const newHour = Number(timeArray[0]) + 1; // Being optimistic that won't return NaN
  return `${newHour}:${timeArray[1]}`;
};

function App() {
  // The reason there is state is to track if the message
  // for the matched time has already been sent
  const [hoursState, setHoursState] = useState(INITIAL_STATE);

  const updateState = time => {
    const newState = { ...hoursState, [time]: true };
    setHoursState(newState);
  };

  useEffect(() => {
    const getCurrentTime = () => {
      const now = new Date();
      const time = `${now.getHours()}:${now.getMinutes()}`;
      const resetTime = getResetTime();

      if (HOURS.includes(time)) {
        updateState(time);
        ipcRenderer.send('show-message');
      }

      if (time === resetTime && Object.values(hoursState).includes(true)) {
        setHoursState(INITIAL_STATE);
      }
    };
    const timer = setInterval(() => {
      getCurrentTime();
    }, 10000);
    return () => clearInterval(timer);
  });

  return (
    <React.Fragment>
      <p>Burn Fat</p>
    </React.Fragment>
  );
}

export default App;
