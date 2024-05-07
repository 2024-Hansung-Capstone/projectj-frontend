import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/MarketDetail.css';

export default function MarketDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state;

    const handleSendMessage = () => {
        const isLoggedIn = true; // Assuming the user is logged in
        if (isLoggedIn) {
            navigate('../Message');
        } else {
            navigate('../pages/Before/Login');
            
        }
    };

    return (
        <div className="container">
            <h2 className="header">상품 상세 정보</h2>
            {product ? (
                <div>
                    <h3 className="productTitle">제목: {product.title}</h3>
                    <p className="productPrice">가격: {product.price}원</p>
                    <p className="productDetail">상세 설명: {product.detail}</p>
                    <button onClick={handleSendMessage}>쪽지보내기</button>
                </div>
            ) : (
                <p>상품 정보를 불러오는 중...</p>
            )}
        </div>
    );
}
