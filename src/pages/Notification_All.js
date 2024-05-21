import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
// Notification_All.js 사용자의 전체 알림을 가져오는 페이지

export const FETCH_MY_NOTIFICATION_MESSAGES = gql`
  query FetchMyNotificationMessages {
    fetchMyNotificationMessages {
      id
      user {
        name
      }
      letter {
        title
        detail
      }
      board {
        title
      }
      reply {
        content
      }
      used_product {
        name
      }
      like {
        user {
          name
        }
        product {
          name
        }
      }
      code
      is_read
      create_at
    }
  }
`;

const Notification_All = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNotificationClick = (notification_id) => {
    navigate('/notification', { state: { notification_id } });
  };

  return (
    <div>
      <h2>My Notifications</h2>
      {data.fetchMyNotificationMessages.map(notification => (
        <div key={notification.id} onClick={() => handleNotificationClick(notification.id)}>
          <h3>{notification.user.name}</h3>
          <p>{new Date(notification.create_at).toLocaleString()}</p>
          <p>{notification.code}</p>
          {notification.letter && <p>Letter: {notification.letter.title}</p>}
          {notification.board && <p>Board: {notification.board.title}</p>}
          {notification.reply && <p>Reply: {notification.reply.content}</p>}
          {notification.used_product && <p>Used Product: {notification.used_product.name}</p>}
          {notification.like && <p>Liked by: {notification.like.user.name}</p>}
        </div>
      ))}
    </div>
  );
};

export default Notification_All;
