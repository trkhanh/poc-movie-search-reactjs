import React from 'react';
import { useState, useEffect } from 'react';
import TimerDisplay from '../Timer/TimerDisplay';
import useTimer from '../Timer/useTimer';
import Notification from '../Notification/Notification';

// Usage in parent component
const TimerApp = () => {
    const [notifications, setNotifications] = useState([]);
    const { timeLeft, start, reset } = useTimer(10, () => {
      setNotifications((prev) => [...prev, { id: Date.now(), message: 'Timer ended!' }]);
    });
  
    useEffect(() => {
      if (timeLeft === 5) {
        setNotifications((prev) => [...prev, { id: Date.now(), message: 'Halfway there!' }]);
      }
    }, [timeLeft]);
  
    return (
      <div style={{backgroundColor: 'white'}}>
        <TimerDisplay timeLeft={timeLeft} />
        <button onClick={start}>Start</button>
        <button onClick={reset}>Reset</button>
        <div className="notifications">
          {notifications.map((n) => (
            <Notification key={n.id} message={n.message} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TimerApp;