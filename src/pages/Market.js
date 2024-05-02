import React, { useState } from 'react';
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

  const handlePostButtonClick = () => {
    navigate('/MarketPost');
  };

  const getToken = () => {
    return localStorage.getItem('token') || ''; // 토큰이 없을 경우 빈 문자열 반환
  };

  const handleDeleteUser = async () => {
    try {
      // 회원 탈퇴 요청 보내기
      const token = getToken();
      // Use token to perform user deletion logic
      if (token) {
        // Perform user deletion logic here
        navigate('/MarketPost');
      } else {
        // Handle case where token is not available
        alert('토큰이 유효하지 않습니다.');
      }
    } catch (error) {
      console.error('Error handling delete user:', error);
      alert('사용자 삭제 중 오류가 발생했습니다.');
    }
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
          {/* 카테고리 목록 */}
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
          data &&
          data.fetchUsedProducts.map((product) => (
          <Market_Item key={product.id} product={product} />
          ))

        )}
      </div>
      <button className="post-button" onClick={handleDeleteUser}>
        상품 등록
      </button>
    </div>
  );
}