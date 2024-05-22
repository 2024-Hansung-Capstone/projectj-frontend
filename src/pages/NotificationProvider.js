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
      }
      board {
        id
      }
      reply {
        id
      }
      used_product {
        id
      }
    }
  }
`;

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [lastNotificationCount, setLastNotificationCount] = useState(0);
  const { data, refetch } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [previousMessages, setPreviousMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // 60초마다 알림 확인
    return () => clearInterval(interval);
  }, [refetch]);

  useEffect(() => {
    if (data && data.fetchMyNotificationMessages.length > lastNotificationCount) {
      const newMessages = data.fetchMyNotificationMessages.slice(lastNotificationCount);
      newMessages.forEach(notification => {
        // 알림 소리 재생
        const audio = new Audio('/path/to/notification-sound.mp3');
        audio.play();
        // 브라우저 알림 표시
        if (Notification.permission === 'granted') {
          new Notification('New Notification', {
            body: `You have a new notification: ${notification.code}`,
          });
        }
      });
      setLastNotificationCount(data.fetchMyNotificationMessages.length);
    }
    if (data) {
      setNotifications(data.fetchMyNotificationMessages);
    }
  }, [data, lastNotificationCount]);

  useEffect(() => {
    if (data) {
      const newMessages = data.fetchMyNotificationMessages;
      if (previousMessages.length > 0 && newMessages.length > previousMessages.length) {
        const newMessage = newMessages.find(message => !previousMessages.some(prevMessage => prevMessage.id === message.id));
        if (newMessage) {
          // 새로운 메시지가 도착했을 때 알림 띄우기
          alert("새로운 메시지가 도착했습니다!");
          // 새로운 메시지의 상세 화면으로 이동
          navigate('/MessageDetail', { state: { messagedata: newMessage } });
        }
      }
      setPreviousMessages(newMessages);
    }
  }, [data, previousMessages, navigate]);
  

  return (
    <NotificationContext.Provider value={notifications}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

export default NotificationProvider; // 기본 내보내기 추가
