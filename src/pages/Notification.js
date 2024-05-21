import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';

const GET_NOTIFICATION_MESSAGE = gql`
  query GetNotificationMessage($notification_id: String!) {
    getNotificationMessage(notification_id: $notification_id)
  }
`;

const Notification = () => {
  const location = useLocation();
  const { notification_id } = location.state || {};

  const { loading, error, data } = useQuery(GET_NOTIFICATION_MESSAGE, {
    variables: { notification_id },
    skip: !notification_id,
    onError: (error) => {
      console.error("Error fetching notification:", error.message);
    }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>gql 연결 안됨</p>;

  const notificationMessage = data.getNotificationMessage;

  return (
    <div className="notification-details-container">
      <h2>Notification Details</h2>
      {notificationMessage ? (
        <>
          <p>ID: {notificationMessage.id}</p>
          <p>User: {notificationMessage.user.name}</p>
          <p>Code: {notificationMessage.code}</p>
          <p>Is Read: {notificationMessage.is_read ? 'Yes' : 'No'}</p>
          <p>Created At: {new Date(notificationMessage.create_at).toLocaleString()}</p>
          
          {notificationMessage.letter && (
            <>
              <h3>Letter Details</h3>
              <p>Title: {notificationMessage.letter.title}</p>
              <p>Detail: {notificationMessage.letter.detail}</p>
            </>
          )}

          {notificationMessage.board && (
            <>
              <h3>Board Details</h3>
              <p>Title: {notificationMessage.board.title}</p>
            </>
          )}

          {notificationMessage.reply && (
            <>
              <h3>Reply Details</h3>
              <p>Content: {notificationMessage.reply.content}</p>
            </>
          )}

          {notificationMessage.used_product && (
            <>
              <h3>Used Product Details</h3>
              <p>Name: {notificationMessage.used_product.name}</p>
            </>
          )}

          {notificationMessage.like && (
            <>
              <h3>Like Details</h3>
              <p>User: {notificationMessage.like.user.name}</p>
              {notificationMessage.like.product && (
                <p>Product: {notificationMessage.like.product.name}</p>
              )}
            </>
          )}
        </>
      ) : (
        <p>알림이 없습니다. </p>
      )}
    </div>
  );
};

export default Notification;
