import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { toast } from 'react-toastify';
import "./css/MarketUpdate.css";

const UPDATE_USED_PRODUCT = gql`
 mutation UpdateUsedProduct($updateUsedProductInput: UpdateUsedProductInput!) {
    updateUsedProduct(updateUsedProductInput: $updateUsedProductInput) {
       id
       user {
        id
        name
       }
       title
       view
       like
       create_at
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

const MarketUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state.product;
  const [formState, setFormState] = useState({
    id: product.id,
    title: product.title,
    price: product.price,
    detail: product.detail,
    category: product.category,
    state: product.state,
    post_images: []
  });

  const [sellerName] = useState(product.user.name);

  const [updateUsedProduct] = useMutation(UPDATE_USED_PRODUCT, {
    onCompleted: (data) => {
      toast.success('상품이 성공적으로 수정되었습니다.');
      navigate('/Market');
    },
    onError: (error) => {
      console.error('상품 수정 중 오류 발생:', error);
      toast.error('상품 수정 중 문제가 발생했습니다.');
      console.log(JSON.stringify(error, null, 2));
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: name === 'price' ? parseFloat(value) : value // 가격은 문자열에서 부동 소수점 숫자로 변환
    });
  };

  const handleFileChange = (e) => {
    setFormState({
      ...formState,
      post_images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUsedProduct({
        variables: {
          updateUsedProductInput: {
            ...formState,
            post_images: Array.from(formState.post_images)
          }
        }
      });
  
    } catch (error) {
      console.error('상품 수정 중 오류 발생:', error);
      toast.error('상품 수정 중 문제가 발생했습니다.');
    }
  };
  

  return (
    <div className="market-post-container">
      <h2>상품 수정</h2>
      <p>판매자: {sellerName}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="market-label">카테고리</label>
          <select
            id="category"
            className="form-control"
            name="category"
            value={formState.category}
            onChange={handleInputChange}
          >
            <option value="의류">의류</option>
            <option value="신발">신발</option>
            <option value="전자기기">전자기기</option>
            <option value="가구">가구/인테리어</option>
            <option value="도서">도서</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="state" className="market-label">판매 상태</label>
          <select
            id="state"
            className="form-control"
            name="state"
            value={formState.state}
            onChange={handleInputChange}
          >
            <option value="판매중">판매중</option>
            <option value="예약중">예약중</option>
            <option value="판매완료">판매완료</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title" className="market-post-title">제목</label>
          <input
            type="text"
            className='market-post-input'
            id="title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            required
            placeholder='제목'
          />
        </div>

        <div className="form-group">
          <label htmlFor="price" className="market-post-price">판매 가격</label>
          <input
            id="price"
            className='market-post-input'
            name="price"
            value={formState.price}
            onChange={handleInputChange}
            required
            placeholder="₩ 가격을 입력해주세요."
          />
        </div>

        <div className="form-group">
          <label htmlFor="detail" className="market-post-detail">상품 설명</label>
          <textarea
            id="detail"
            className='market-post-input market-post-textarea'
            name="detail"
            value={formState.detail}
            onChange={handleInputChange}
            required
            placeholder="상품 설명을 입력해주세요."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image" className="market-label">사진 업로드</label>
          <input
            type="file"
            id="image"
            className="market-post-input"
            onChange={handleFileChange}
            multiple
          />
        </div>
        <button type="submit" className="btn market-post-btn">수정완료</button>
      </form>
    </div>
  );
};

export default MarketUpdate;