import React, { memo } from 'react';
import { useState, useEffect } from 'react';
import TimerDisplay from '../Timer/TimerDisplay';
import useCountDownTimer from '../Timer/useCountDownTimer';
import Notification from '../Notification/Notification';
// Usage in parent component
const Para = memo(({ text }) => {
  return <h1>{text}</h1>;
});

const TimerApp = () => {
    const [notifications, setNotifications] = useState([]);

    const { timeLeft, start, reset } = useCountDownTimer(10, () => {
      setNotifications((prev) => [...prev, { id: Date.now(), message: 'Timer ended!' }]);
    });
  
    useEffect(() => {
      if (timeLeft === 5) {
        setNotifications((prev) => [...prev, { id: Date.now(), message: 'Halfway there!' }]);
      }
    }, [timeLeft]);

    const ButtonStart = memo(({ start }) => {
      return <button onClick={start}>Start</button>;
    });

    const ButtonReset = memo(({ reset }) => {
      return <button onClick={reset}>Reset</button>;
    });
    
    return (
      <div style={{backgroundColor: 'white'}}>
        <Para text="This is a paragraph" />
        <TimerDisplay timeLeft={timeLeft} />
        <ButtonStart start={start} />
        <ButtonReset reset={reset} />
        <div className="notifications">
          {notifications.map((n) => (
            <Notification key={n.id} message={n.message} />
          ))}
        </div>
      </div>
    );
  };
  
  export default TimerApp;