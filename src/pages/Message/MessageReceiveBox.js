import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client'; // useMutation 추가
import { IoRefreshOutline } from "react-icons/io5";
import "./css/MessageBox.css";

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

// 메시지 읽음처리 
const READ_LETTER = gql`
  mutation ReadLetter($letter_id: String!) {
    readLetter(letter_id: $letter_id)
  }
`;

const MessageReceiveBox = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [selectedCategory, setSelectedCategory] = useState('중고마켓');
  const [messages, setMessages] = useState([]);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [readLetter] = useMutation(READ_LETTER);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(8); // 페이지당 알림 수

  useEffect(() => {
    if (!token) {
      navigate('/login');
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

  // 메시지 읽음 처리 함수
  const markMessageAsRead = async (messageId) => {
    try {
      await readLetter({ variables: { letter_id: messageId } });
      // 성공적으로 읽음 처리되었을 때 메시지 상태 업데이트
      const updatedMessages = messages.map(message =>
        message.id === messageId ? { ...message, is_read: true } : message
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Failed to mark message as read:", error);
    }
  };

  const handleItemClick = (messagedata) => {
    // 메시지를 클릭하면 읽음 처리 함수 호출
    markMessageAsRead(messagedata.id);
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const renderIsReadStatus = (isRead) => {
    return isRead ? "읽음" : <img src="new.png" alt="new" style={{width: "50px", textAlign:'center'}}/>;
  };


  return (
    <div className="message-container">
      <div className="message-header">
        <h2>수신함</h2>
        <div className="button-group">
          <Link to="/MessageSendBox">쪽지 송신함 바로가기</Link>
          <button onClick={handleRefreshClick}><IoRefreshOutline style={{font: 'bold'}}/></button>
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
            <th>보낸 사람</th>
            {selectedCategory === '중고마켓' && <th>상품명</th>}
            <th>제목</th>
            <th>내용</th>
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
              dataLetters.fetchMyReceiveLetters
                .filter((messagedata) => 
                  messagedata.receiver.name === dataWhoAmI.whoAmI.name &&
                  messagedata.category === selectedCategory
                ).length > 0 ? (
                dataLetters.fetchMyReceiveLetters
                  .filter((messagedata) => 
                    messagedata.receiver.name === dataWhoAmI.whoAmI.name &&
                    messagedata.category === selectedCategory
                  )
                  .map((messagedata, index) => (
                    <tr key={index} onClick={() => handleItemClick(messagedata)}>
                      <td>{renderIsReadStatus(messagedata.is_read)}</td>
                      <td>{messagedata.sender.name}</td>
                      {selectedCategory === '중고마켓' && <td>{messagedata.product.title}</td>}
                      <td>{messagedata.title}</td>
                      <td>{messagedata.detail}</td>
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

export default MessageReceiveBox;