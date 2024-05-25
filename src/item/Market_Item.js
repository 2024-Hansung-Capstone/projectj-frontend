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

  // 날짜를 변환하는 함수
  const convertDateToAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return '오늘';
    } else if (diffDays === 1) {
      return '1일 전';
    } else {
      return `${diffDays}일 전`;
    }
  };

  if (!product || !product.user) return null; // 사용자 정보가 없는 경우 처리

  const imageSrc = product.post_images && product.post_images.length > 0
    ? product.post_images[0].imagePath
    : null; // 이미지가 없는 경우 null

  return (
    <div className="market-item" onClick={() => onClick(product)}>
      <div className="marketitem-container">
        <div className="marketitem-main1">
          <div className="marketitem-photo">
            {imageSrc ? (
              <img src={imageSrc} alt="Product" />
            ) : (
              <div className="marketitem-no-image">no-image</div> // 이미지가 없는 경우 "no-image" 표시
            )}
          </div>
          <div className="marketitem-title">
            <p>{product.title}</p>
          </div>
        </div>
        <div className="marketitem-main2">
          <div className="marketitem-price">
            <p>{product.price} 원</p>
          </div>
          <div className="marketitem-StateAndTime">
            <p>{product.state}</p>
            <p>{convertDateToAgo(product.create_at)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
