import React, { memo } from 'react';

const TimerDisplay = memo(({ timeLeft }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div aria-live="polite" style={{ fontSize: '5rem', color: 'red' }}>
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
});

export default TimerDisplay;