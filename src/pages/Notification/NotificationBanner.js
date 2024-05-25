import React, { useEffect } from 'react';
import { useNotifications } from './NotificationProvider';
import { Link } from "react-router-dom";
import './css/Notification.css';

const NotificationBanner = () => {
  const { newNotification, setNewNotification } = useNotifications();

  useEffect(() => {
    if (newNotification) {
      const timer = setTimeout(() => {
        setNewNotification(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [newNotification, setNewNotification]);

  if (!newNotification) return null;

  return (
    <div className="notification-banner">
      <p>새로운 알림이 도착했습니다! <Link to="/Notification">Check them out!</Link></p>
    </div>
  );
};

export default NotificationBanner;
