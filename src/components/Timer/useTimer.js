// useTimer.js
import { useState, useEffect, useCallback, useRef } from 'react';

// Custom hook to handle timer logic
const useTimer = (initialTime = 60, onTimerEnd = () => {}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the timer
  // In reactjs, when a function recareted, it can cause child components
  // that depend on it to re-render unnecessarily. Since `start` is likely passed
  // down to a component, like Button. Memoizing it would prevent that button from
  // re-rendering every time the parent updates
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