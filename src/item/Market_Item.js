import React, { useState } from 'react';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import { LiaEyeSolid } from "react-icons/lia";
import { useMutation, gql } from '@apollo/client';
import './css/Market_Item.css';

const INCREASE_PRODUCT_LIKE = gql`
  mutation IncreaseProductLike($product_id: ID!) {
    increaseProductLike(product_id: $product_id) {
      id
      like
    }
  }
`;

export default function Market_Item({ product, onClick }) {
  const [isLiked, setIsLiked] = useState(false); // 좋아요 상태를 저장하는 상태
  const [increaseLike] = useMutation(INCREASE_PRODUCT_LIKE);  // 쿼리 사용할 때 반드시 이름 별칭 처리

  const handleLikeClick = (e) => {
    e.stopPropagation(); 
    increaseLike({ variables: { product_id: product.id } })
      .then((response) => {
        console.log('좋아요가 증가되었습니다.', response.data);
        setIsLiked(prev => !prev); // 상태를 토글하여 좋아요 상태 변경
      })
      .catch((err) => {
        console.error('좋아요 증가 에러:', err);
      });
  };

  if (!product || !product.user) return null; // 사용자 정보가 없는 경우 처리

  return (  // 데이터 값을 (product) 로 product 데이터를 전달 받음.
    <div className="market-item" onClick={() => onClick(product)}>
      <div className="marketitem-container">
        <div className="marketitem-main1">
          <div className="marketitem-photo">
            {/* 상품 이미지 표시 */}
            <img src={product.imageBase64} alt="Product" />
          </div>
          <div className="marketitem-id"></div>
          <div className="marketitem-title">
            <p>제목 : {product.title}</p>
          </div>
          <div className="marketitem-seller">
            <p>판매자 : {product.user.name}</p>
          </div>
        </div>
        <div className="marketitem-category">
          <p>{product.category}</p>
        </div>
        <div className="marketitem-main2">
          <div className="marketitem-price">
            <p>{product.price} 원</p>
          </div>
          <div className="marketitem-state">
            <p>{product.state}</p>
          </div>
        </div>
        <div className="marketitem-likeview">
          <div className="marketitem-like" onClick={handleLikeClick}>
            {/* isLiked 상태에 따라 채워진 하트 또는 빈 하트를 보여줌 */}
            <p>{isLiked ? <GoHeartFill /> : <GoHeart />} {product.like}</p>
          </div>
          <div className="marketitem-view">
            <p><LiaEyeSolid/> {product.view}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
