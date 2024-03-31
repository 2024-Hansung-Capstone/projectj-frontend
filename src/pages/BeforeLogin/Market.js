import React, { useState } from 'react';
import "./css/Market.css";
import Market_Item from '../../item/Market_Item.js';
import { HiOutlineBars3 } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";

export default function Market() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="market-container"

        >
            <div className="market-header">
                <div className="market-category-icon"
                           onMouseEnter={() => setIsHovered(true)}
                           onMouseLeave={() => setIsHovered(false)}
                >
                    <HiOutlineBars3 style={{fontSize: '40px'}}/>
                </div>
                <IoSearchOutline className='market-search-icon'/>
                <input type="text" className="market-search-input" placeholder="상품명을 입력하세요."/>
            </div>
            {isHovered && (
                <div className="market-category"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* 카테고리 목록 */}
                    <p> 의류</p>
                    <p> 신발</p>
                    <p> 가전</p>
                    <p> 가구/인테리어</p>
                    <p> 식품</p>
                    <p> 도서</p>
                </div>
            )}
            <div className="market-item">
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
                <Market_Item />
            </div>
        </div>
    );
}
