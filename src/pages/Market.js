import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Market_Item from '../item/Market_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery, gql } from '@apollo/client';
import "./css/Market.css";

const GET_USED_PRODUCTS = gql`
  query GetUsedProducts {
    fetchUsedProducts {
      id
      title
      price
      detail
      category
      state
    }
  }
`;

export default function Market() {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('전체');
  
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

  const handleCategoryClick = (category) => {
    const selected = category === 'all' ? '전체' : category;
    setSelectedCategory(selected);
  }

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
        <p onClick={() => handleCategoryClick('all')}>전체</p>
        <p onClick={() => handleCategoryClick('clothing')}>의류</p>
        <p onClick={() => handleCategoryClick('shoes')}>신발</p>
        <p onClick={() => handleCategoryClick('electronic')}>가전</p>
        <p onClick={() => handleCategoryClick('furniture')}>가구</p>
        <p onClick={() => handleCategoryClick('food')}>식품</p>
        <p onClick={() => handleCategoryClick('book')}>도서</p>
      </div>
      )}
      <div className="market-item">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data && data.fetchUsedProducts.filter((product) => selectedCategory === '전체' || product.category === selectedCategory).length > 0 ? (
            data.fetchUsedProducts
              .filter((product) => selectedCategory === '전체' || product.category === selectedCategory) // 카테고리 필터링
              .map((product, index) => (
                <Market_Item key={index} product={product} onClick={() => handleItemClick(product)} />
              ))
          ) : (
            <p className='nodata'>등록된 상품이 없습니다.</p>
          )
        )}
      </div>
      <button className="post-button" onClick={handlePostButtonClick}>상품 등록</button>
    </div>
  );
}
