import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/Market.css";
import { useMutation, useQuery, gql } from '@apollo/client'; 

const GET_USED_PRODUCTS = gql`
  query GetUsedProducts {
    fetchUsedProducts {
      id
      title
      price
      detail
      category
      state
      user {
        id
        name
      }
    }
  }
`;

const CREATE_USED_PRODUCT = gql`
  mutation CreateUsedProduct($createUsedProductInput: CreateUsedProductInput!) {
    createUsedProduct(createUsedProductInput: $createUsedProductInput) {
      title
      price
      detail
      category
      state
      user {
        id
        name
      }
    }
  }
`;

const MarketPost = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('');
  

  const navigate = useNavigate();
  const location = useLocation(); // useLocation 사용
  const isLoggedIn = location.state?.isLoggedIn; // Market.js에서 전달된 로그인 상태를 받음

  const { loading, error, data } = useQuery(GET_USED_PRODUCTS);
  const [createUsedProduct] = useMutation(CREATE_USED_PRODUCT);

  const handleTitleChange = (e) => {  
    setTitle(e.target.value);
  };

  const handlePriceChange = (e) => {  
    setPrice(e.target.value);
  };

  const handleDetailChange = (e) => {  
    setDetail(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {  
    e.preventDefault();
    try {
      const { data } = await createUsedProduct({
        variables: {
          createUsedProductInput: {
            title,
            price: parseInt(price),
            detail,
            category,
            state: "판매중",
          },
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        },
        refetchQueries: [{ query: GET_USED_PRODUCTS }] // 수정완료 버튼 클릭 시 바로 Market에서 업데이트되도록 할 때 필수 입력!!!
      });
      console.log('새로 추가된 상품:', data.createUsedProduct);
      navigate("/Market");
    } catch (error) {
      console.error('상품 추가 중 오류:', error);
    }
  };
  
  return (
    <div className="market-post-container">
      <h2>상품 등록하기</h2>
      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category" className="market-label">카테고리</label>
            <select 
            id="category" 
            className="form-control" 
            value={category} 
            onChange={handleCategoryChange}
          >
            <option value="">선택해주세요</option>
            <option value="의류">의류</option>
            <option value="신발">신발</option>
            <option value="전자기기">전자기기</option>
            <option value="가구">가구/인테리어</option>
            <option value="도서">도서</option>
            </select>
            </div>
          <div className="form-group">
            <label htmlFor="title" className="market-post-title">제목</label>
            <input type="text" className='market-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="market-post-price">판매 가격</label>
            <input id="price" className='market-post-input' value={price} onChange={handlePriceChange} required placeholder="₩ 가격을 입력해주세요." />
          </div>
          <div className="form-group">
            <label htmlFor="detail" className="market-post-detail">상품 설명</label>
            <textarea id="detail" value={detail} onChange={handleDetailChange} required placeholder="신뢰할 수 있는 거래를 위해 자세한 상품 설명을 작성해주세요." />
          </div>
    
          <button type="submit" className="market-post-button">작성 완료</button>
        </form>
      )}
      {!isLoggedIn && (
        <p>로그인 후에 상품을 등록할 수 있습니다.</p>
      )}
    </div>
  );
};

export default MarketPost;