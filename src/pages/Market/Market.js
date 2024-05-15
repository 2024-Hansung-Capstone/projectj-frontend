import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Market_Item from '../../item/Market_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery, useMutation, gql } from '@apollo/client';
import "./css/Market.css";

// 전체 상품 데이터 가져오기
// 전체 상품 가져오는 gql을 "GET_USED_PRODUCTS"로 별칭 지정. 
const GET_USED_PRODUCTS = gql`   
  query GetUsedProducts {
    fetchUsedProducts {
      id
      title
      price
      detail
      category
      state
      create_at
      view
      like
      user {
        id
        name
      }
    }
  }
`;
// 조회수
const INCREASE_USED_PRODUCT_VIEW = gql`
  mutation IncreaseUsedProductView($product_id: String!) {
    increaseUsedProductView(product_id: $product_id) {
      id
      view
    }
  }
`;

// 좋아요
const INCREASE_USED_PRODUCT_LIKE = gql`
  mutation IncreaseUsedProductLike($product_id: String!) {
    increaseUsedProductLike(product_id: $product_id) {
      id
      like
    }
  }
`;

export default function Market() {
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);  // 위에서 지정한 전체상품 gql 변수 선언
  const [increaseView] = useMutation(INCREASE_USED_PRODUCT_VIEW); 
  const [increaseLike] = useMutation(INCREASE_USED_PRODUCT_LIKE);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 현재 로그인 유무
  const [loggedInUserName, setLoggedInUserName] = useState('');  // 로그인 사용자 이름 

  useEffect(() => {  // 토큰 가져오기
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  

    // 현재 로그인 유저 확인
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, []);
  
   // 상품등록 버튼 클릭 -> 등록 시 로그인 유무 확인
  const handlePostButtonClick = () => { 
    navigate('/MarketPost', { state: { isLoggedIn } });
  };

  // 카테고리 버튼 클릭
  const handleCategoryClick = (category) => {
    const selected = category === 'all' ? '전체' : category;
    setSelectedCategory(selected);
  };

  // 상품 클릭 시 조회수 증가
  const handleItemClick = (product) => {
    increaseView({ variables: { product_id: product.id }})
      .then(response => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('조회수 증가 에러:', err);
      });
      // 상품 상세 설명으로 이동 (상품, 현재 로그인 중인 유저 이름도 함께 이동)
    navigate('/MarketDetail', { state: { product, loggedInUserName } });
  };


  // 좋아요 클릭 리스너
  const handleLikeClick = (product) => {
    increaseLike({ variables: { product_id: product.id }}) // 1 증가
      .then(response => {
        console.log('좋아요가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('좋아요 증가 에러:', err);
      });

    // 상품 상세 설명으로 이동 (상품, 현재 로그인 중인 유저 이름도 함께 이동)
    navigate('/MarketDetail', { state: { product, loggedInUserName } });
  };


  // !!! 안봐도 됩니다!!! 페이지네이션 로직 (한 페이지 당 12개 표시, 그 이상은 2번째 페이지로. )
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data && data.fetchUsedProducts.filter((product) => 
    selectedCategory === '전체' || product.category === selectedCategory
  ).slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  if (data && data.fetchUsedProducts.length > 0) {
    for (let i = 1; i <= Math.ceil(data.fetchUsedProducts.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  // 여기서부터 페이지 디자인
  // 배치는 거의 대부분 해놨습니다. 추가로 필요하면 css로 수정해주세요.
  return (
    <div className="market-container">
       {/* 카테고리 */}
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
          <p onClick={() => handleCategoryClick('전체')}>전체</p>
          <p onClick={() => handleCategoryClick('의류')}>의류</p>
          <p onClick={() => handleCategoryClick('신발')}>신발</p>
          <p onClick={() => handleCategoryClick('전자기기')}>전자기기</p>
          <p onClick={() => handleCategoryClick('가구')}>가구/인테리어</p>
          <p onClick={() => handleCategoryClick('도서')}>도서</p>
        </div>
      )}

       {/* 상품 */}
        {/* 각각의 상품은 Market_Item에 하나씩 담겨있습니다. 상품 1개당 Market_Item 1개씩 입니다. */}
      <div className="market-item">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          currentItems && currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <Market_Item key={index} product={product} onClick={() => handleItemClick(product)} />
            ))
          ) : (
            <p className='nodata'>등록된 상품이 없습니다.</p>
          )
        )}
      </div>

      {/* 등록된 상품 전체 불러오기 */}
      <div className="market-item">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          currentItems && currentItems.length > 0 ? (
            currentItems.map((product, index) => (
              <Market_Item key={index} product={product} onClick={() => handleLikeClick(product)} />
            ))
          ) : (
            <p className='nodata'>등록된 상품이 없습니다.</p>
          )
        )}
      </div>

      {/* 페이지 나누기 (안봐도 됨) */}
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} onClick={() => setCurrentPage(number)} style={{ cursor: 'pointer' }}>
            {number}
          </li>
        ))}
      </ul>

      {/* 상품등록 버튼  */}
      <button className='post-button2' onClick={handlePostButtonClick}>상품 등록</button>
    </div>
  );
}
