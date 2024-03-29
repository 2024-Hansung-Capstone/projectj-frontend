import React, { useState } from 'react';
import './css/MessageBox.css';

function MessageBox() {
  const [messages, setMessages] = useState([
    { id: 7, content: 'dsfsfr', sender: 'aaa', timestamp: '2024-03-09 06:16' },
    { id: 6, content: 'dsfsfr', sender: 'aaa', timestamp: '2024-03-11 06:16' },
    { id: 5, content: 'fhfdh', sender: 'aaa', timestamp: '2024-03-20 06:15' },
    { id: 4, content: 'asf', sender: 'aaa', timestamp: '2024-03-20 06:15' },
    { id: 3, content: 'hello', sender: 'aaa', timestamp: '2024-03-21 06:11' },
    { id: 2, content: 'hello', sender: 'aaa', timestamp: '2024-03-25 06:11' },
    { id: 1, content: 'hello', sender: 'aaa', timestamp: '2024-03-27 06:11' },
  ]);

  return (
    <div className="MessageBox">
      <header className="messagebox-container">
        <h3>수신 쪽지함 > 목록보기</h3>
        <input type="text" placeholder="쪽지 검색" />
      </header>
      <div className="messagebox-list">
        {messages.map(message => (
          <div key={message.id} className="Message">
            <span>{message.content}</span>
            <span>{message.sender}</span>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="messagebox-buttons">
        <button>이전 페이지</button>
        <button>다음 페이지</button>
      </div>
    </div>
  );
}

export default MessageBox;
