import React from 'react';
import "./css/Market_Item.css";

export default function Market_Item({ product, onClick }) {
    // 게시물이 존재하지 않을 경우 빈 상태로 반환
    if (!product) return null;

    return (
        <div className="market-item" onClick={() => onClick(product)}>

        <div className="marketitem-container">
            <div className='marketitem-main1'>
                <div className="marketitem-photo">
                </div>
                <div className="marketitem-id">
                    <p>상품ID : {product.user?.name}</p>
                </div>
                <div className="marketitem-title">
                    <p>제목 : {product.title}</p> 
                </div>
            </div>
            <div className="marketitem-title">
                    <p>카테고리 : {product.category}</p> 
                </div>
            <div className='marketitem-main2'>
                <div className="marketitem-price">
                    <p>{product.price} 원</p>
                </div>
            </div>
            <div className="marketitem-title">
                    <p>{product.state}</p> 
                </div>
        </div>

        </div>
    );
}