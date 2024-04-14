import React, { useState } from 'react';
import './css/MarketPost.css';
import { FaCamera } from "react-icons/fa";
import { useMutation } from '@apollo/client'; 
import { useNavigate } from 'react-router-dom';
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
  const [mainImage, setMainImage] = useState(null);
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState([{ text: '', preview: null }]);
  const [nextId, setNextId] = useState(1);
  
  const navigate = useNavigate();
  const [createUsedProduct] = useMutation(CREATE_USED_PRODUCT);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(URL.createObjectURL(selectedImage));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
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
          <label htmlFor="mainImage" className="market-post-photo"><FaCamera /> 대표 사진 첨부 </label>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
          {mainImage && <img src={mainImage} alt="Main Preview" className="market-main-image-preview" />}
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
