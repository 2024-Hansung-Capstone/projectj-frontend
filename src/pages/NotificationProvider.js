// NotificationProvider.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const NotificationContext = createContext();

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

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastNotificationCount, setLastNotificationCount] = useState(0);
  const { data, refetch } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 10000); // 10초마다 알림 확인
    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};
//export const useNotifications = () => useContext(NotificationContext);
export default NotificationProvider;
