import React, { useState, useRef, useEffect } from 'react';
import './css/CookingDetails.css';

const CookingDetails = ({ mainImage, author, title, content, recipes }) => {
  const [chatMessages, setChatMessages] = useState([]); // 채팅 메시지를 담는 상태
  const [messageInput, setMessageInput] = useState(''); // 채팅 입력값 상태
  const [showChat, setShowChat] = useState(false); // 채팅창 보이기/숨기기 상태
  const chatContentRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]); // chatMessages가 업데이트될 때마다 스크롤을 맨 아래로 이동

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

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
    <div className="cooking-details-container">
      <div className="ck-main-image-container">
        {mainImage ? (
          <img src={mainImage} alt="메인" className="cooking-main-image" />
        ) : (
          <div className="ck-main-no-image">이미지 없음</div>
        )}
      </div>
      <p className="author">글쓴이</p>
      <h1 className="title">{title || '요리 글 제목'}</h1>
      <p className="content">{content || '소개글'}</p>
      <div className="recipes-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-item">
              <div className="recipe-image-container">
                {recipe.image ? (
                  <img src={recipe.image} alt={`레시피 ${index + 1}`} className="recipe-image" />
                ) : (
                  <div className="recipe-no-image">이미지 없음</div>
                )}
              </div>
              <p className="recipe-text">{recipe.text || `레시피 ${index + 1}`}</p>
            </div>
          ))
        ) : (
          <div className="recipe-no-image">레시피가 없습니다.</div>
        )}
      </div>
      <button className='cooking-chat-button' onClick={toggleChat}> 채팅하기</button>
      {/* 채팅창 */}
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
}

export default CookingDetails;
