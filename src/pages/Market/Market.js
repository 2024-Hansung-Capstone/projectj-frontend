import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Market_Item from '../../item/Market_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { useQuery, useMutation, useLazyQuery, gql } from '@apollo/client';
import "./css/Market.css";

// 전체 상품 데이터 가져오기
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
      post_images {
        id
        imagePath
      }
      user {
        id
        name
        dong {
          name
        }
      }
      like_user {
        id
          user {
            id
            name
          }
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

const SEARCH_USED_PRODUCTS = gql`
  query SearchUsedProducts($input: SearchProductInput!) {
    fetchUsedProductsBySearch(SerachUsedProductInput: $input) {
      id
      user {
        id
        name
        dong {
          name
        }
      }
      title
      view
      like
      post_images {
        id
        imagePath
      }
      price
      detail
      category
      state
      create_at
    }
  }
`;

const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
      dong {
        name
      }
    }
  }
`;

export default function Market() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchProducts, { loading: searchLoading, data: searchData }] = useLazyQuery(SEARCH_USED_PRODUCTS, {
    onCompleted: (data) => {
      setSearchResults(data.fetchUsedProductsBySearch);
      setCurrentPage(1);
    }
  });
  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const { loading: whoAmILoading, error: whoAmIError, data: whoAmIData } = useQuery(WHO_AM_I_QUERY);
  const [increaseView] = useMutation(INCREASE_USED_PRODUCT_VIEW);
  const [increaseLike] = useMutation(INCREASE_USED_PRODUCT_LIKE);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    console.log(JSON.stringify(error, null, 2));
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, []);

  const handlePostButtonClick = () => {
    navigate('/MarketPost', { state: { isLoggedIn } });
  };

  const handleCategoryClick = (category) => {
    const selected = category === '전체' ? '전체' : category;
    setSelectedCategory(selected);
    setCurrentPage(1); // 카테고리 변경 시 페이지를 1로 초기화
  };

  const handleItemClick = (product) => {
    increaseView({ variables: { product_id: product.id } })
      .then(response => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('조회수 증가 에러:', err);
      });
    navigate('/MarketDetail', { state: { product, loggedInUserName } });
  };

  const handleLikeClick = (product) => {
    increaseLike({ variables: { product_id: product.id } })
      .then(response => {
        console.log('좋아요가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('좋아요 증가 에러:', err);
      });
    navigate('/MarketDetail', { state: { product, loggedInUserName } });
  };

  const handleSearch = () => {
    searchProducts({
      variables: {
        input: {
          title: searchTerm
        }
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults || (data && data.fetchUsedProducts);

  let filteredItems = [];
  if (currentItems && whoAmIData && whoAmIData.whoAmI) {
    filteredItems = currentItems.filter(product =>
      product.user && product.user.dong && product.user.dong.name === whoAmIData.whoAmI.dong.name
    );
  }

  // 카테고리 필터링
  if (selectedCategory !== '전체') {
    filteredItems = filteredItems.filter(product => product.category === selectedCategory);
  }

  const itemsToDisplay = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const pageNumbers = [];
  if (filteredItems.length > 0) {
    for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div className="market-container">
      <div className='cook-ai-header'>
          <img src="/assets/market/marketPost.png" alt="market" style={{width:'50px',height: '50px', marginRight:'10px', marginBottom:'5px'}}/>
          <h2>중고마켓 </h2>
        </div>
      <div className="market-header">
        <div
          className="market-category-icon"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <HiOutlineBars3 style={{ fontSize: '40px' }} />
        </div>
        <input
          type="text"
          className="market-search-input"
          placeholder="상품명을 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <IoSearchOutline className="market-search-icon" onClick={handleSearch} />
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

      <div className="market-item">
        {loading || whoAmILoading ? (
          <p>Loading...</p>
        ) : error || whoAmIError ? (
          <p>Error: {error ? error.message : whoAmIError.message}{console.log(JSON.stringify(error, null, 2))}</p>
        ) : (
          itemsToDisplay && itemsToDisplay.length > 0 ? (
            itemsToDisplay.map((product, index) => (
              <Market_Item key={index} product={product} onClick={() => handleItemClick(product)} />
            ))
          ) : (
            <p className='market-nodata'>등록된 상품이 없습니다.</p>
          )
        )}
      </div>

      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} onClick={() => setCurrentPage(number)} style={{ cursor: 'pointer' }}>
            {number}
          </li>
        ))}
      </ul>

      <button className='post-button2' onClick={handlePostButtonClick}>상품 등록</button>
    </div>
  );
}
