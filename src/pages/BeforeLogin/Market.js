import React, { useState } from 'react';
import "./css/Market.css";
import Market_Item from '../../item/Market_Item.js';

export default function Market() {

    return (
        <div className="market-container">
            <div className="market-header">
                <p>검색</p>
            </div>
            <div className="market-category">
                <p>카테고리</p>
            </div>
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