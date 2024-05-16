import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/MessageDetail.css";

const MessageDetail = () => {
  const location = useLocation();
  const { messagedata } = location.state;
  const navigate = useNavigate();
  
  // MessageDetail 컴포넌트 내 handleReply 함수 수정
  const handleReply = () => {
    navigate('/MessageReply', { state: { writingId: messagedata.id } });
  };
  

  return (
    <div className="message-detail-container">
        <h1 className="message-detail-header">메시지 정보</h1>
        <table className="message-detail-info">
            <tr>
                <th>송신자</th>
                <td>{messagedata.sender.name}</td>
            </tr>
            <tr>
                <th>수신자</th>
                <td>{messagedata.receiver.name}</td>
            </tr>
            <tr>
                <th>카테고리</th>
                <td>{messagedata.category}</td>
            </tr>
            <tr>
                <th>제목</th>
                <td>{messagedata.title}</td>
            </tr>
            <tr>
                <th>내용</th>
                <td>{messagedata.detail}</td>
            </tr>

        </table>
        <button className="reply-button" onClick={handleReply}>답장 보내기</button>
    </div>
  );
};

export default MessageDetail;
