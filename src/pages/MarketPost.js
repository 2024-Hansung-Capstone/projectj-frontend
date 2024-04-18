import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Market.css";
import { useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';

const CREATE_USED_PRODUCT = gql`
  mutation CreateUsedProduct($createUsedProductInput: CreateUsedProductInput!) {
    createUsedProduct(createUsedProductInput: $createUsedProductInput) {
      id
      user {
        id
        name
        email
      }
      title
      view
      like
      price
      detail
      category
      state
      create_at
    }
  }
`;

const MarketPost = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting data:", { title, price, detail });

    try {
      const { data } = await createUsedProduct({
        variables: {
          createUsedProductInput: {
            title,
            price: parseInt(price),
            detail,
            category: "default", // 기본값 제공
            state: "active" // 기본값 제공
          },
        },
      });

      console.log('Newly added used product:', data.createUsedProduct);

      navigate('/market');
    } catch (error) {
      console.error('Error adding used product:', error);
    }
  };

  return (
    <div className="market-post-container">
      <h2>상품 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="market-post-title">제목</label>
          <input type="text" className='market-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
        </div>
        <div className="form-group">
          <label htmlFor="price" className="market-post-price">판매 가격</label>
          <input id="price"className='market-post-input' value={price} onChange={handlePriceChange} required placeholder="₩ 가격을 입력해주세요." />
        </div>
        <div className="form-group">
          <label htmlFor="detail" className="market-post-detail">상품 설명</label>
          <textarea id="detail" value={detail} onChange={handleDetailChange} required placeholder="신뢰할 수 있는 거래를 위해 자세한 상품 설명을 작성해주세요." />
        </div>
        <button type="submit" className="market-post-button">작성 완료</button>
      </form>
    </div>
  );
};

export default MarketPost;
