import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

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

const GET_NOTIFICATION_MESSAGE = gql`
  query GetNotificationMessage($notification_id: String!) {
    getNotificationMessage(notification_id: $notification_id)
  }
`;

const Notification = () => {
  const { loading: loadingNotifications, error: errorNotifications, data: dataNotifications } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  });

  const [getNotificationMessage, { called, loading, data: messageData }] = useLazyQuery(GET_NOTIFICATION_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  });

  useEffect(() => {
    if (dataNotifications?.fetchMyNotificationMessages.length) {
      dataNotifications.fetchMyNotificationMessages.forEach(notification => {
        getNotificationMessage({ variables: { notification_id: notification.id } });
      });
    }
  }, [dataNotifications, getNotificationMessage]);

  if (loadingNotifications) return <p>로딩 중...</p>;
  if (errorNotifications) return <p>에러: {errorNotifications.message}</p>;

  return (
    <div>
      <h1>알림</h1>
      <ul>
        {dataNotifications.fetchMyNotificationMessages.map((notification) => (
          <li key={notification.id}>
            <p>{new Date(notification.create_at).toLocaleString()}</p>
            <div>
              <p>{messageData && messageData.getNotificationMessage ? messageData.getNotificationMessage : "로딩 중..."}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
