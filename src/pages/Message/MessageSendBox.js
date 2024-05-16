import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";
import "../gql/whoAmI";

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

const MessageSendBox = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
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

  return (
    <div className="message-container">
      <div className="message-header">
        <h2>송신함</h2>
        <Link to="/MessageReceiveBox">쪽지 수신함 바로가기</Link>
        <button onClick={handleRefreshClick}>새로고침</button>
      </div>
      <table className='message-table'>
        <thead>
          <tr>
          <th>받는 사람(나)</th>
            <th>보낸 사람</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>내용</th>
          </tr>
        </thead>
        <tbody>
          {loadingLetters || loadingWhoAmI ? (
            <tr><td colSpan="4">Loading...</td></tr>
          ) : errorLetters || errorWhoAmI ? (
            <tr>
              <td colSpan="4">
                Error: {errorLetters ? errorLetters.message : errorWhoAmI.message}
                {errorLetters?.message === 'Unauthorized' && ' - Please check your login status.'}
                {errorWhoAmI?.message === 'Unauthorized' && ' - Please check your login status.'}
              </td>
            </tr>
          ) : (
            dataLetters && dataWhoAmI && dataWhoAmI.whoAmI && dataLetters.fetchMySendLetters.filter((messagedata) => messagedata.sender.name === dataWhoAmI.whoAmI.name).length > 0 ? (
              dataLetters.fetchMySendLetters.map((messagedata, index) => (
                <tr key={index} onClick={() => handleItemClick(messagedata)}>
                  <td>{messagedata.sender.name}</td>
                  <td>{messagedata.receiver.name}</td>
                  <td>{messagedata.category}</td>
                  <td>{messagedata.title}</td>
                  <td>{messagedata.detail}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className='nodata'>등록된 쪽지가 없습니다.</td></tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MessageSendBox;
