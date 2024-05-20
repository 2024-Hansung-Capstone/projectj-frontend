import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useLocation } from 'react-router-dom';

// GraphQL 쿼리 정의
const GET_NOTIFICATION_MESSAGE = gql`
  query GetNotificationMessage($notification_id: String!) {
    getNotificationMessage(notification_id: $notification_id)
  }
`;

const Notification = () => {
  // useLocation 훅을 사용하여 필요한 notification_id를 가져옴
  const location = useLocation();
  const { notification_id } = location.state || {};

  // useQuery 훅을 사용하여 GraphQL 쿼리 실행
  const { loading, error, data } = useQuery(GET_NOTIFICATION_MESSAGE, {
    variables: { notification_id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="cooking-details-container">
      {/* 데이터가 로드되면 알림 메시지를 표시 */}
      <p>{data.getNotificationMessage}</p>
    </div>
  );
};

export default Notification;
