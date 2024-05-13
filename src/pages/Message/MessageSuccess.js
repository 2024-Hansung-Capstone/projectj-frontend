import React from 'react';
import { Link } from 'react-router-dom';

const MessageSuccess = () => {
  return (
    <div className="message-success-container">
      <h2>메시지 전송 성공!</h2>
      <p>메시지가 성공적으로 전송되었습니다.</p>
      <Link to="/MessageSendBox">메시지 송신함으로 이동</Link>
      <Link to="/MessageReciveBox">메시지 수신함으로 이동</Link>
    </div>
  );
};

export default MessageSuccess;
