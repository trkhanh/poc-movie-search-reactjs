import React from 'react';
import { useState, useEffect } from 'react';
import TimerDisplay from '../Timer/TimerDisplay';
import useTimer from '../Timer/useTimer';

const Notification = ({ message, type = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? <div className={`notification ${type}`}>{message}</div> : null;
};

// Usage in parent component
const TimerApp = () => {
  const [notifications, setNotifications] = useState([]);
  const { timeLeft, start, reset } = useTimer(60, () => {
    setNotifications((prev) => [...prev, { id: Date.now(), message: 'Timer ended!' }]);
  });

  useEffect(() => {
    if (timeLeft === 30) {
      setNotifications((prev) => [...prev, { id: Date.now(), message: 'Halfway there!' }]);
    }
  }, [timeLeft]);

  return (
    <div>
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