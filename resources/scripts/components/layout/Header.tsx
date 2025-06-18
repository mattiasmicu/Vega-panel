import React, { useState, useEffect } from 'react';
import { Bell, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import axios from 'axios';

interface HeaderProps {
  currentUser: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
  read: boolean;
}

interface UserData {
  username: string;
  avatar: string;
  role: 'admin' | 'user' | 'moderator';
  email: string;
}

export const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userData, setUserData] = useState<UserData>({
    username: currentUser,
    avatar: '',
    role: 'admin',
    email: ''
  });

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch notifications
  useEffect(() => {
    fetchNotifications();
    const notificationTimer = setInterval(fetchNotifications, 30000); // Check every 30 seconds

    return () => clearInterval(notificationTimer);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get<Notification[]>('/api/notifications');
      setNotifications(response.data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      window.location.href = '/login';
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await axios.post(`/api/notifications/${notificationId}/read`);
      setNotifications(notifications.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      ));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Time Display */}
          <div className="text-gray-300 font-mono">
            UTC - {format(currentTime, 'yyyy-MM-dd HH:mm:ss')}
          </div>

          {/* Right Section: Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5" />
                {unreadNotifications.length > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadNotifications.length}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white mb-3">Notifications</h3>
                    {notifications.length === 0 ? (
                      <p className="text-sm text-gray-400">No new notifications</p>
                    ) : (
                      <div className="space-y-3">
                        {notifications.map((notification) => (
                          <div 
                            key={notification.id} 
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              notification.read 
                                ? 'bg-gray-700/30' 
                                : 'bg-gray-700/50 hover:bg-gray-700/70'
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm text-white">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {format(new Date(notification.createdAt), 'MMM d, yyyy HH:mm')}
                                </p>
                              </div>
                              <span className={`w-2 h-2 rounded-full ${
                                notification.read 
                                  ? 'bg-gray-600' 
                                  : getNotificationTypeColor(notification.type)
                              }`} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button 
                className="flex items-center space-x-3 p-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <img 
                  src={userData.avatar || '/default-avatar.png'} 
                  alt={userData.username}
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-left">
                  <div className="text-sm font-medium">{userData.username}</div>
                  <div className="text-xs text-gray-400">{userData.role}</div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="py-1">
                    <a 
                      href="/profile" 
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </a>
                    <a 
                      href="/settings" 
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper function for notification colors
function getNotificationTypeColor(type: Notification['type']): string {
  switch (type) {
    case 'success': return 'bg-green-500';
    case 'warning': return 'bg-yellow-500';
    case 'error': return 'bg-red-500';
    default: return 'bg-blue-500';
  }
}
