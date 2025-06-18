import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HeaderProps {
  currentUser: string;
}

export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Update time immediately
    updateTime();
    
    // Update time every second
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateTime = () => {
    const now = new Date();
    const timeString = now.toISOString().replace('T', ' ').substring(0, 19);
    setCurrentTime(timeString);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-gray-300 font-mono text-sm">
          Current Date and Time (UTC): {currentTime}
        </div>
        <div className="text-gray-300 text-sm">
          Current User's Login: {currentUser}
        </div>
      </div>
    </header>
  );
};
