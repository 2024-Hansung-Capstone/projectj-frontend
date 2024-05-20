import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 수신 메시지 정보 (받는 사람 (나))
const FETCH_MY_RECEIVE_LETTERS = gql`
  query FetchMyReceiveLetters {
    fetchMyReceiveLetters {
      id
      sender {
        name
      }
      receiver {
        name
      }
      category
      title
      detail
    }
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

const MessageReceiveBox = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  }, [token, navigate]);

  const { loading: loadingLetters, error: errorLetters, data: dataLetters, refetch } = useQuery(FETCH_MY_RECEIVE_LETTERS, {
    context: {
      headers: {
        authorization: `Bearer ${token || ''}`
      }
    },
    notifyOnNetworkStatusChange: true,
  });

  const { loading: loadingWhoAmI, error: errorWhoAmI, data: dataWhoAmI } = useQuery(WHO_AM_I_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${token || ''}`
      }
    },
  });

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 불러옴
    refetch();
  }, [refetch]);

  const handleItemClick = (messagedata) => {
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const handleRefreshClick = () => {
    // 데이터 새로고침 버튼 클릭 이벤트
    refetch();
  };

  const handleUnauthorizedError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <h2>수신함</h2>
        <Link to="/MessageSendBox">쪽지 송신함 바로가기</Link>
        <button onClick={handleRefreshClick}>새로고침</button>
      </div>
      <table className='message-table'>
        <thead>
          <tr>
            <th>보낸 사람</th>
            <th>받는 사람(나)</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {loadingLetters || loadingWhoAmI ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : errorLetters || errorWhoAmI ? (
            <tr>
              <td colSpan="5">
                Error: {errorLetters ? errorLetters.message : errorWhoAmI.message}
                {((errorLetters && errorLetters.message === 'Unauthorized') ||
                  (errorWhoAmI && errorWhoAmI.message === 'Unauthorized')) && (
                  <div>
                    <p>로그인 상태를 확인해주세요.</p>
                    <button onClick={handleUnauthorizedError}>로그인 페이지로 이동</button>
                  </div>
                )}
              </td>
            </tr>
          ) : (
            dataLetters && dataWhoAmI && dataWhoAmI.whoAmI && dataLetters.fetchMyReceiveLetters.filter((messagedata) => messagedata.receiver.name === dataWhoAmI.whoAmI.name).length > 0 ? (
              dataLetters.fetchMyReceiveLetters.map((messagedata, index) => (
                <tr key={index} onClick={() => handleItemClick(messagedata)}>
                  <td>{messagedata.sender.name}</td>
                  <td>{messagedata.receiver.name}</td>
                  <td>{messagedata.category}</td>
                  <td>{messagedata.title}</td>
                  <td>{messagedata.detail}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className='nodata'>등록된 쪽지가 없습니다.</td></tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageReceiveBox;
