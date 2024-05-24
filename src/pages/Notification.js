import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import './css/Notification.css';

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

const GET_NOTIFICATION_MESSAGE = gql`
  query GetNotificationMessage($notification_id: String!) {
    getNotificationMessage(notification_id: $notification_id)
  }
`;

const DELETE_NOTIFICATION_MESSAGE = gql`
  mutation DeleteNotificationMessage($notification_id: String!) {
    deleteNotificationMessage(notification_id: $notification_id)
  }
`;

const DELETE_ALL_MY_NOTIFICATION_MESSAGES = gql`
  mutation DeleteAllMyNotificationMessages {
    deleteAllMyNotificationMessages
  }
`;

const Notification = () => {
  const { loading: loadingNotifications, error: errorNotifications, data: dataNotifications, refetch } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  });

  const [getNotificationMessage] = useLazyQuery(GET_NOTIFICATION_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
  });

  const [deleteNotificationMessage] = useMutation(DELETE_NOTIFICATION_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    },
    update(cache, { data: { deleteNotificationMessage } }) {
      // 삭제된 알림 ID를 기준으로 캐시에서 해당 알림을 제거
      cache.modify({
        fields: {
          fetchMyNotificationMessages(existingNotificationRefs, { readField }) {
            return existingNotificationRefs.filter(
              notificationRef => deleteNotificationMessage !== readField('id', notificationRef)
            );
          },
        },
      });
    },
  });

  const [deleteAllMyNotificationMessages] = useMutation(DELETE_ALL_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
      onCompleted: () => {
        refetch();
      },
    },
  });

  const [notificationDetails, setNotificationDetails] = useState({});

  useEffect(() => {
    if (dataNotifications?.fetchMyNotificationMessages?.length) {
      const notificationDetailsPromises = dataNotifications.fetchMyNotificationMessages.map(notification =>
        getNotificationMessage({
          variables: { notification_id: notification.id }
        }).then(({ data }) => {
          if (data && data.getNotificationMessage) {
            return { [notification.id]: data.getNotificationMessage };
          } else {
            return { [notification.id]: "알림 메시지를 불러오는 데 실패했습니다." };
          }
        }).catch(error => {
          console.error(`Error fetching notification message for id ${notification.id}:`, error);
          return { [notification.id]: "알림 메시지를 불러오는 데 실패했습니다." };
        })
      );

      Promise.all(notificationDetailsPromises)
        .then(detailsArray => {
          const details = detailsArray.reduce((acc, detail) => ({ ...acc, ...detail }), {});
          setNotificationDetails(details);
        });
    }
  }, [dataNotifications, getNotificationMessage]);

  if (loadingNotifications) return <p>로딩 중...</p>;
  if (errorNotifications) return <p>에러: {errorNotifications.message}</p>;

  if (!dataNotifications || !dataNotifications.fetchMyNotificationMessages) {
    return <p>알림 데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  const sortedNotifications = dataNotifications.fetchMyNotificationMessages.slice().sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

  const handleDeleteNotification = (notification_id) => {
    deleteNotificationMessage({ variables: { notification_id } });
  };

  const handleDeleteAllNotifications = () => {
    deleteAllMyNotificationMessages();
  };

  return (
    <div>
      <div className='notification-container'>
        <div className='notification-container1'>
          <img src="/notification.png" alt="notification" />
          <h1>알림</h1>
          <button onClick={handleDeleteAllNotifications}>전체 삭제</button>
        </div>
        <div className='notification-container2'>
          <ul>
            {sortedNotifications.map((notification) => (
              <li key={notification.id}>
                <div className='notification-detail'>
                  <p>{notificationDetails[notification.id] || "로딩 중..."}</p>
                  {notification.id}
                </div>
                <div className='notification-date'>
                  <p>{new Date(notification.create_at).toLocaleString()}</p>
                </div>
                <button onClick={() => handleDeleteNotification(notification.id)}>삭제</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notification;
