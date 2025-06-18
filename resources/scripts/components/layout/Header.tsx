import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

interface HeaderProps {
  currentUser: string;
}

export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time in UTC
  const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Time Display */}
          <div className="text-gray-300 font-mono">
            UTC - {formattedTime}
          </div>

          {/* User Info */}
          <div className="text-gray-300">
            {currentUser}
          </div>
        </div>
      </div>
    </header>
  );
};
