import React from 'react';
import "./css/Market_Item.css";

export default function Market_Item({ product, onClick }) {
    if (!product || !product.user) return null; // 사용자 정보가 없는 경우 처리

    return (
        <div className="market-item" onClick={() => onClick(product)}>
            <div className="marketitem-container">
                <div className='marketitem-main1'>
                    <div className="marketitem-photo">
                    </div>
                    <div className="marketitem-id">
                        { /* <p>상품ID : {product.id}</p> */}
                    </div>
                    <div className="marketitem-title">
                        <p>제목 : {product.title}</p> 
                    </div>
                    <div className="marketitem-seller">
                        <p>판매자 : {product.user.name}</p> 
                    </div>
                </div>
                <div className="marketitem-title">
                        <p>카테고리 : {product.category}</p> 
                    </div>
                <div className='marketitem-main2'>
                    <div className="marketitem-price">
                        <p>{product.price} 원</p>
                    </div>
                <div className="marketitem-state">
                        <p>{product.state}</p> 
                    </div>
                </div>
            </div>
        </div>
    );
}
