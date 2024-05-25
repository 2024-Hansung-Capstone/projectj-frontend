import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const NotificationContext = createContext({
  notifications: [],
  refetch: () => {},
  newNotification: null,
  setNewNotification: () => {},
});

const FETCH_MY_NOTIFICATION_MESSAGES = gql`
  query FetchMyNotificationMessages {
    fetchMyNotificationMessages {
      id
      code
      create_at
      letter {
        id
        title
      }
      board {
        id
        title
      }
      reply {
        id
        detail
      }
      used_product {
        id
        title
      }
    }
  }
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const token = localStorage.getItem('token');

  const { loading, error, data, refetch } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
    onCompleted: () => {
      if (data && data.fetchMyNotificationMessages) {
        setNotifications(data.fetchMyNotificationMessages);
      }
    },
    onError: (error) => {
      console.error("알림 데이터를 불러오는 중 오류가 발생했습니다:", error);
    },
  });

  useEffect(() => {
    if (data && data.fetchMyNotificationMessages) {
      const newNotifications = data.fetchMyNotificationMessages.filter(notification =>
        !notifications.some(existingNotification => existingNotification.id === notification.id)
      );
      if (newNotifications.length > 0) {
        setNewNotification(newNotifications[0]);
        setNotifications(data.fetchMyNotificationMessages);
      }
    }
  }, [data, notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, refetch, newNotification, setNewNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
