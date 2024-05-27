import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8); // 페이지당 알림 수

  const { loading: loadingNotifications, error: errorNotifications, data: dataNotifications, refetch } = useQuery(FETCH_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    skip: !token,
    onError: (error) => {
      console.error("알림 데이터를 불러오는 중 오류가 발생했습니다:", error);
    },
  });

  const [getNotificationMessage] = useLazyQuery(GET_NOTIFICATION_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onError: (error) => {
      console.error("알림 메시지를 불러오는 중 오류가 발생했습니다:", error);
    },
  });

  const [deleteNotificationMessage] = useMutation(DELETE_NOTIFICATION_MESSAGE, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    update(cache, { data: { deleteNotificationMessage: deletedNotificationId } }) {
      cache.modify({
        fields: {
          fetchMyNotificationMessages(existingNotificationRefs, { readField }) {
            return existingNotificationRefs.filter(
              notificationRef => deletedNotificationId !== readField('id', notificationRef)
            );
          },
        },
      });
    },
    onError: (error) => {
      console.error("알림 삭제 중 오류가 발생했습니다:", error);
    },
  });

  const [deleteAllMyNotificationMessages] = useMutation(DELETE_ALL_MY_NOTIFICATION_MESSAGES, {
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
    onCompleted: () => {
      refetch();
    },
    onError: (error) => {
      console.error("전체 알림 삭제 중 오류가 발생했습니다:", error);
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
          console.error(`ID ${notification.id}의 알림 메시지를 불러오는 중 오류가 발생했습니다:`, error);
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

  if (!token) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (loadingNotifications) return <p>로딩 중...</p>;
  if (errorNotifications) return <p>에러: {errorNotifications.message}</p>;

  if (!dataNotifications || !dataNotifications.fetchMyNotificationMessages) {
    return <p>알림 데이터를 불러오오는 중 오류가 발생했습니다.</p>;
  }

  // 페이지네이션
  const totalPages = Math.ceil((dataNotifications?.fetchMyNotificationMessages?.length || 0) / perPage);

  const handleNextPage = () => {  // 다음페이지
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };
  const handlePreviousPage = () => { // 이전페이지
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  // 현재 페이지에 해당하는 알림만 추출
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentPageNotifications = dataNotifications.fetchMyNotificationMessages.slice(startIndex, endIndex);
  const sortedNotifications = currentPageNotifications.slice().sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

  const handleDeleteNotification = (notification_id) => {
    deleteNotificationMessage({ variables: { notification_id } }).then(() => {
      refetch();
    });
  };
  const handleDeleteAllNotifications = () => {
    deleteAllMyNotificationMessages().then(() => {
      refetch();
    });
  };

    // 날짜를 변환하는 함수
    const convertDateToAgo = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
      if (diffDays === 0) {
        return '오늘';
      } else if (diffDays === 1) {
        return '1일 전';
      } else {
        return `${diffDays}일 전`;
      }
    };

  const handleNotificationClick = (notification) => {
    console.log("알림 클릭됨:", notification);
    switch (notification.code) {
      case 100:
        navigate('/Home');
        break;
      case 200:
      case 201:
        // Assuming '/MarketDetail' is the correct path
        navigate('/MarketDetail');
        break;
      case 202:
      case 203:
      case 300:
        // Assuming '/CommunityDetail' is the correct path
        navigate('/CommunityDetail');
        break;
      case 400:
        // Assuming '/MessageReceiveBox' is the correct path
        navigate('/MessageReceiveBox');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div className='notification-container'>
        <div className='notification-container1'>
          <img src="/assets/notification/notification.png" alt="notification" />
          <h1>알림</h1>
          <button onClick={handleDeleteAllNotifications}>전체 삭제</button>
        </div>
        <div className='notification-container2'>
          {sortedNotifications.length === 0 ? (
            <>
              <img src='/emptyBox.png' alt='emptyBox' style={{width:'150px', height:'150px', marginTop:'30px'}}/>
              <p className='notification-nodata'>알림이 없습니다.</p>
            </>
          ) : (
            <ul>
              {sortedNotifications.map((notification) => (
                <li key={notification.id} onClick={() => handleNotificationClick(notification)}>
                  <div className='notification-detail'>
                    <p>{notificationDetails[notification.id] || "로딩 중..."}</p>
                  </div>
                  <div className='notification-date'>
                    <p>{convertDateToAgo(notification.create_at)}</p>
                    {/*<p>{new Date(notification.create_at).toLocaleString()}</p>*/}
                  </div>
                  <button onClick={() => handleDeleteNotification(notification.id)}>
                    <img src="/assets/notification/deleteBox.png" alt="deleteBox" style={{width:'25px', height:'25px'}}/>
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>이전</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>다음</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;