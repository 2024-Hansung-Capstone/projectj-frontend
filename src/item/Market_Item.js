import React from 'react';
import "./css/Market_Item.css";

export default function Market_Item() {
    return (
        <div className="marketitem-container">
            <div className='marketitem-main1'>
                <div className="marketitem-photo">
                    <p>사진</p>
                </div>
                <div className="marketitem-title">
                    <p>제목</p>
                </div>
            </div>
            <div className='marketitem-main2'>
                <div className="marketitem-price">
                    <p>가격</p>
                </div>
                <div className="market-date">
                    <p>날짜</p>
                </div>
            </div>
        </div>
    );
}