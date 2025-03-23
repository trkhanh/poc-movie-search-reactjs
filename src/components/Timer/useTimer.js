// useTimer.js
import { useState, useEffect, useCallback, useRef } from 'react';

const useTimer = (initialTime = 60, onTimerEnd = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = useCallback(() => {
    if (!isRunning && timeLeft > 0) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            onTimerEnd(); // Trigger callback when timer ends
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [isRunning, timeLeft, onTimerEnd]);

  const reset = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(initialTime);
  }, [initialTime]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return { timeLeft, isRunning, start, reset };
};