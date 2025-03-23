import React from 'react';
import { useState, useEffect } from 'react';

const Notification = ({ message, type = 'info' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? <div className={`notification ${type}`}>{message}</div> : null;
};

export default Notification;