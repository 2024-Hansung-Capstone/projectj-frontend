import React, { useState, useRef, useEffect } from 'react';
import './css/OneroomDetails.css';

const OneroomDetails = ({
  mainImage,
  location,
  monthlyRent,
  jeonsePrice,
  managementFee,
  availableDate,
  building,
  floor,
  area,
  roomCount,
  bathroomCount,
  parking,
  description,
}) => {
  const [showChat, setShowChat] = useState(false); // 채팅창 보이기/숨기기 상태
  const [messageInput, setMessageInput] = useState(''); // 채팅 입력값 상태
  const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지를 담는 상태
  const chatContentRef = useRef(null); // 채팅 내용을 담고 있는 요소의 ref

  // 채팅창 토글 함수
  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // 채팅 입력값 변경 핸들러
  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  // 채팅 메시지 전송 핸들러
  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      setChatMessages([...chatMessages, { content: messageInput, sender: '나' }]);
      setMessageInput('');
    }
  };

  // 엔터 키를 눌렀을 때 메시지 전송
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  // 채팅 내용이 추가될 때마다 스크롤을 아래로 이동
  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [chatMessages]);

  return (
    <div className="oneroom-details-container">
      <div className="or-main-image-container">
        {mainImage ? (
          <img src={mainImage} alt="Main" className="oneroom-main-image" />
        ) : (
          <div className="oneroom-no-image">No Image</div>
        )}
      </div>
      <p className="author">글쓴이</p>
      <h2 className="location">{location || '위치 미입력'}</h2>
      <div className="price">
        {monthlyRent || jeonsePrice ? (
          <h2>{monthlyRent ? '월세' : '전세'}</h2>
        ) : (
          <h2>월세/전세 가격</h2>
        )}
      </div>
      <div className="description">
        <h3>상세 설명</h3>
        <p>{description || '상세 설명'}</p>
      </div>
      <h3>원룸 정보</h3>
      <div className="details-table">
        <table>
          <tbody>
          </tbody>
        </table>
      </div>
      <button className="oneroom-chat-button" onClick={toggleChat}>
        {' '}
        채팅하기
      </button>
      {showChat && (
        <div className="chat-window">
          <div className="chat-header">
            <button className="close-button" onClick={toggleChat}>X</button>
          </div>
          <div className="chat-content">
            {chatMessages.map((message, index) => (
              <div key={index} className={`message ${message.sender === '나' ? 'me' : 'them'}`}>
                <div className="message-info">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-time">{message.time}</span>
                </div>
                <div className="message-content">{message.content}</div>
              </div>
            ))}
            <div ref={chatContentRef}></div>
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="메시지를 입력하세요."
              value={messageInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>전송</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OneroomDetails;