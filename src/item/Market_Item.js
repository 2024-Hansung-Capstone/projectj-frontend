import React from 'react';
import { GoHeartFill } from 'react-icons/go';
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
  const [increaseLike] = useMutation(INCREASE_PRODUCT_LIKE);

  const handleLikeClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling to parent elements
    increaseLike({ variables: { product_id: product.id } })
      .then((response) => {
        console.log('좋아요가 증가되었습니다.', response.data);
      })
      .catch((err) => {
        console.error('좋아요 증가 에러:', err);
      });
  };

  if (!product || !product.user) return null; // 사용자 정보가 없는 경우 처리

  return (
    <div className="market-item" onClick={() => onClick(product)}>
      <div className="marketitem-container">
        <div className="marketitem-main1">
          <div className="marketitem-photo"></div>
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
            <GoHeartFill />
            <p>{product.like}</p>
          </div>
          <div className="marketitem-view">
            <p>{product.view}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
