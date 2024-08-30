import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

const NotificationPopup = ({ isOpen, onClose, userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`http://localhost:3080/api/notifications/${userId}`);
        setNotifications(response.data);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        setError('알림을 불러오는 데 실패했습니다.');
      }
    };

    if (isOpen) {
      fetchNotifications();
      // 30초마다 알림 업데이트
      const intervalId = setInterval(fetchNotifications, 30000);
      return () => clearInterval(intervalId);
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-4 bg-white shadow-lg rounded-lg w-80 h-96 p-4 z-50 overflow-y-auto">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
      >
        <IoClose size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-4 text-green-600">알림</h3>
      <div>
        {error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        {notifications.length === 0 ? (
          <p className="text-gray-500">새로운 알림이 없습니다.</p>
        ) : (
          notifications.map((notification) => (
            <div key={notification._id} className="mb-4 border-b border-gray-200 pb-2">
              <p className="font-medium">{notification.title}</p>
              <p>{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;