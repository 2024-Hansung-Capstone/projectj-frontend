import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Message_Item from '../../item/Message_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery, gql } from '@apollo/client';
import "./css/MessageBox.css";

// 수신 메시지 정보
const FETCH_MY_RECEIVE_LETTERS = gql`
  query FetchMyReciveLetters {
    fetchMyReciveLetters {
      id
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      category
      title
      detail
    }
  }
`;

export default function MessageSendBox() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_MY_RECEIVE_LETTERS);
  const [selectedCategory, setSelectedCategory] = useState('수신');

  const handleItemClick = (messagedata) => {
    navigate('/MessageDetail', { state: { messagedata } });
  };

  const handleCategoryClick = (category) => {
    const selected = category === '수신' ? '수신' : category;
    setSelectedCategory(selected);
  };

  return (
    <div className="market-container">
      <div className="market-header">
        <Link to="/MessageSendBox">쪽지 수신함 바로가기</Link>
        <div
          className="market-category-icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HiOutlineBars3 style={{ fontSize: '40px' }} />
        </div>
        <IoSearchOutline className="market-search-icon" />
        <input
          type="messagebox-text"
          className="market-search-input"
        />
      </div>
      {isHovered && (
        <div
          className="market-category"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p onClick={() => handleCategoryClick('수신')}>수신</p>
          <p onClick={() => handleCategoryClick('송신')}>송신</p>
        </div>
      )}
      <div className="market-item">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data && data.fetchMyReciveLetters.filter((messagedata) => selectedCategory === '수신' || messagedata.category === selectedCategory).length > 0 ? (
            data.fetchMyReciveLetters
              .filter((messagedata) => selectedCategory === '수신' || messagedata.category === selectedCategory)
              .map((messagedata, index) => (
                <Message_Item key={index} messagedata={messagedata} onClick={() => handleItemClick(messagedata)} />
              ))
          ) : (
            <p className='nodata'>등록된 상품이 없습니다.</p>
          )
        )}
      </div>
    </div>
  );
}
