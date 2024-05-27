import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import "./css/MessageDetail.css";

const DELETE_LETTER = gql`
  mutation DeleteLetter($letter_id: String!) {
    deleteLetter(letter_id: $letter_id)
  }
`;

const MessageDetail = () => {
  const location = useLocation();
  const { messagedata } = location.state;
  const navigate = useNavigate();

  const [deleteLetter] = useMutation(DELETE_LETTER);

  // 삭제 버튼 클릭 시 호출되는 함수
  const handleDelete = async () => {
    try {
      await deleteLetter({
        variables: { letter_id: messagedata.id },
      });
      alert('메시지가 성공적으로 삭제되었습니다.');
      navigate('/MessageReceiveBox');
    } catch (error) {
      console.error('메시지 삭제 중 오류가 발생했습니다:', error);
      alert('메시지 삭제 중 오류가 발생했습니다.');
    }
  };

  // 답장 버튼 클릭 시 호출되는 함수
  const handleReply = () => {
    navigate('/MessageReply', { state: { writingId: messagedata.id } });
  };

  return (
    <div className="message-detail-container">
      <h1 className="message-detail-header">메시지</h1>
      <table className="message-detail-info">
        <tbody>
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
        </tbody>
      </table>
      <div className='md-button-container'>
        <button className="md-button" onClick={handleReply}>답장 보내기</button>
        <button className="md-button" onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default MessageDetail;
