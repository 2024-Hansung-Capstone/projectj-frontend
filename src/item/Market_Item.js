// Market_Item.js

import React from 'react';
import "./css/Market_Item.css";

export default function Market_Item({ product }) {
    // 게시물이 존재하지 않을 경우 빈 상태로 반환합니다.
    if (!product) return null;

    return (
        <div className="marketitem-container">
            <div className='marketitem-main1'>
                <div className="marketitem-photo">
                    <img src={product.mainImage} alt="Product" /> {/* 이미지를 표시합니다. */}
                </div>
                <div className="marketitem-title">
                    <p>{product.title}</p> {/* 제목을 표시합니다. */}
                </div>
            </div>
            <div className='marketitem-main2'>
                <div className="marketitem-price">
                    <p>{product.price}</p> {/* 가격을 표시합니다. */}
                </div>
                <div className="market-date">
                    <p>{product.create_at}</p> {/* 생성 날짜를 표시합니다. */}
                </div>
            </div>
        </div>
    );
}
