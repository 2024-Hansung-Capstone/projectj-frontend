import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "./css/MarketPost.css";
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
      post_images {
        id
        imagePath
      }
    }
  }
`;

const CREATE_USED_PRODUCT = gql`
  mutation CreateUsedProduct($createUsedProductInput: CreateUsedProductInput!) {
    createUsedProduct(createUsedProductInput: $createUsedProductInput) {
      id
    }
  }
`;

const MarketPost = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState('');
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const location = useLocation(); 
  const isLoggedIn = location.state?.isLoggedIn; 

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

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
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
            post_images: files  // 파일 자체를 전달
          }
        },
        context: {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token') || ''}`
          }
        },
        refetchQueries: [{ query: GET_USED_PRODUCTS }]
      });
      console.log('새로 추가된 상품:', data.createUsedProduct);
      navigate("/Market");
    } catch (error) {
      console.error('상품 추가 중 오류:', error);
    }
  };
  
  return (
    <div className="market-post-container">
      <div className="community-post-header">
        <img src='/assets/market/marketPost.png' alt='marketPost' className="market-post-image"/>
        <h2>상품 등록</h2>
      </div>
      {isLoggedIn && (
        <form onSubmit={handleSubmit}>
          <div className="market-post-form-group">
            <label htmlFor="category" className="market-post-label">카테고리</label>
            <select 
              id="category" 
              className="market-post-select" 
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
          <div className="market-post-form-group">
            <label htmlFor="title" className="market-post-label">제목</label>
            <input type="text" className='market-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
          </div>
          <div className="market-post-form-group">
            <label htmlFor="price" className="market-post-label">판매 가격</label>
            <input id="price" className='market-post-input' value={price} onChange={handlePriceChange} required placeholder="₩ 가격을 입력해주세요." />
          </div>
          <div className="market-post-form-group">
            <label htmlFor="image" className="market-post-label">사진 첨부</label>
            <input type="file" id="image" accept="image/*" multiple onChange={handleFileChange} required />
          </div>
          <div className="market-post-form-group">
            <label htmlFor="detail" className="market-post-label">상품 설명</label>
            <textarea id="detail" className='market-post-textarea' value={detail} onChange={handleDetailChange} required placeholder="신뢰할 수 있는 거래를 위해 자세한 상품 설명을 작성해주세요." />
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
