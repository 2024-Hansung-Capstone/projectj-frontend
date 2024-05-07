import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import "./css/Market.css";
import Market_Item from '../item/Market_Item.js';
import MarketPost from './MarketPost';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_USED_PRODUCTS = gql`
  query GetUsedProducts {
    fetchUsedProducts {
      id
      title
      price
      detail
    }
  }
`;

export default function Market() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  
  // 로그인 상태를 확인하는 상태 추가
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handlePostButtonClick = () => {
    navigate('/MarketPost', { state: { isLoggedIn } }); // 로그인 상태를 navigate의 state로 전달
  };

  const handleItemClick = (product) => {
    navigate('/MarketDetail', {state: { product }});
  };

  return (
    <div className="market-container">
      <div className="market-header">
        <div
          className="market-category-icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HiOutlineBars3 style={{ fontSize: '40px' }} />
        </div>
        <IoSearchOutline className="market-search-icon" />
        <input
          type="text"
          className="market-search-input"
          placeholder="상품명을 입력하세요."
        />
      </div>
      {isHovered && (
        <div
          className="market-category"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <p>의류</p>
          <p>신발</p>
          <p>가전</p>
          <p>가구/인테리어</p>
          <p>식품</p>
          <p>도서</p>
        </div>
      )}
      <div className="market-item">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          // Market_Item 컴포넌트 렌더링 부분
          data &&
          data.fetchUsedProducts.map((product, index) => (
            <Market_Item key={index} product={product} onClick={handleItemClick} />
          ))
        )}
      </div>
      <button className="post-button" onClick={handlePostButtonClick}>
        상품 등록
      </button>
    </div>
  );
}
