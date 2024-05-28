import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 송신 메시지 정보(보낸 사람 (나))
const FETCH_MY_SEND_LETTERS = gql`
  query FetchMySendLetters {
    fetchMySendLetters {
      id
      sender {
        name
      }
      receiver {
        name
      }
      product {
        title
      }
      category
      title
      detail
      is_read
      create_at
    }
  }
`;

const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

// 수신함에서는 읽기 표시 안되도록 해놨음.
// 상대방이 메시지를 읽으면 그때 읽음표시로 전환
// 메시지 읽음처리 
const READ_LETTER = gql`
  mutation ReadLetter($letter_id: String!) {
    readLetter(letter_id: $letter_id)
  }
`;

const MessageSendBox = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('중고마켓');
  const [messages, setMessages] = useState([]);
  const token = localStorage.getItem('token');
  const [readLetter] = useMutation(READ_LETTER);
  const { loading: loadingLetters, error: errorLetters, data: dataLetters, refetch } = useQuery(FETCH_MY_SEND_LETTERS, {
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
    if (!token) {
      navigate('/login'); // 토큰이 없으면 로그인 페이지로 리디렉션
    }
  }, [token, navigate]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 불러옴
    refetch();
  }, [refetch]);

  const handleRefreshClick = () => {
    refetch();
  };

  const handleUnauthorizedError = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}.${day}.${hours}:${minutes}`;
  };

  const handleItemClick = (messagedata) => {
    // Mark the message as read
    const updatedMessages = messages.map(message =>
      message.id === messagedata.id ? { ...message, is_read: true } : message
    );
    setMessages(updatedMessages);

    navigate('/MessageDetail', { state: { messagedata } });
  };

  const renderIsReadStatus = (isRead) => {
    return isRead ? "읽음" : "안읽음";
  };

  return (
    <div className="message-container">
      <div className="message-header">
        <div className="community-post-header">
          <img src='/assets/home/message.png' alt='message' style={{width:'40px', height: '40px', marginRight:'10px'}}/>
          <h2>송신함</h2>
      </div>
        <div className="button-group">
          <Link to="/MessageReceiveBox">쪽지 수신함 바로가기</Link>
        </div>
      </div>
      <div className="tabs">
        <button onClick={() => setSelectedCategory('중고마켓')} className={selectedCategory === '중고마켓' ? 'active' : ''}>
          중고마켓
        </button>
        <button onClick={() => setSelectedCategory('자취생메이트')} className={selectedCategory === '자취생메이트' ? 'active' : ''}>
          자취생메이트
        </button>
      </div>
      <table className='message-table'>
        <thead>
          <tr>
            <th></th>
            <th>받는 사람</th>
            {selectedCategory === '중고마켓' && <th>상품명</th>}
            <th>제목</th>
            <th>보낸 시간</th>
          </tr>
        </thead>
        <tbody>
          {loadingLetters || loadingWhoAmI ? (
            <tr><td colSpan="6">Loading...</td></tr>
          ) : errorLetters || errorWhoAmI ? (
            <tr>
              <td colSpan="6">
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
            dataLetters && dataWhoAmI && dataWhoAmI.whoAmI ? (
              dataLetters.fetchMySendLetters
                .filter((messagedata) => 
                  messagedata.sender.name === dataWhoAmI.whoAmI.name &&
                  messagedata.category === selectedCategory
                ).length > 0 ? (
                dataLetters.fetchMySendLetters
                  .filter((messagedata) => 
                    messagedata.sender.name === dataWhoAmI.whoAmI.name &&
                    messagedata.category === selectedCategory
                  )
                  .map((messagedata, index) => (
                    <tr key={index} onClick={() => handleItemClick(messagedata)}>
                      <td>{renderIsReadStatus(messagedata.is_read)}</td>
                      <td>{messagedata.receiver.name}</td>
                      {selectedCategory === '중고마켓' && messagedata.product && <td>{messagedata.product.title}</td>}
                      <td>{messagedata.title}</td>
                      <td>{formatDateTime(messagedata.create_at)}</td>
                    </tr>
                  ))
              ) : (
                <tr><td colSpan="6" className='nodata'>등록된 쪽지가 없습니다.</td></tr>
              )
            ) : null
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageSendBox;
