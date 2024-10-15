import React, { useState, useEffect } from 'react';
import { Bell, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  message: string;
  read: boolean;
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // In a real application, you would fetch notifications from an API
    const fetchNotifications = () => {
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'info',
          message: 'Your upcoming trip to Bali is in 3 days. Don\'t forget to pack!',
          read: false,
          date: '2024-05-28T10:00:00Z'
        },
        {
          id: '2',
          type: 'success',
          message: 'Congratulations! You\'ve earned 500 loyalty points from your last booking.',
          read: false,
          date: '2024-05-27T14:30:00Z'
        },
        {
          id: '3',
          type: 'warning',
          message: 'Weather alert: Possible storms in Paris during your stay. Please check local advisories.',
          read: true,
          date: '2024-05-26T09:15:00Z'
        }
      ];
      setNotifications(mockNotifications);
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info': return <Bell className="text-blue-500" />;
      case 'warning': return <Bell className="text-yellow-500" />;
      case 'success': return <Bell className="text-green-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
          <div className="py-2">
            <div className="px-4 py-2 bg-gray-100 text-gray-800 font-semibold">Notifications</div>
            {notifications.length === 0 ? (
              <div className="px-4 py-2 text-gray-600">No new notifications</div>
            ) : (
              notifications.map((notif) => (
                <div key={notif.id} className={`px-4 py-2 hover:bg-gray-100 ${notif.read ? 'opacity-50' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0">{getNotificationIcon(notif.type)}</div>
                    <div className="ml-3 w-0 flex-1">
                      <p className="text-sm leading-5 text-gray-800">{notif.message}</p>
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {new Date(notif.date).toLocaleString()}
                      </p>
                    </div>
                    <div className="ml-3 flex-shrink-0 flex">
                      {!notif.read && (
                        <button
                          onClick={() => markAsRead(notif.id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        className="ml-2 text-red-600 hover:text-red-800"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;