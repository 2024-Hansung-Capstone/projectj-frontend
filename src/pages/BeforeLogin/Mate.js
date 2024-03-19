import React, { useState, useEffect } from 'react';
import MateFilterBar from '../../components/MateFilterBar';
import Mate_Item from '../../item/Mate_Item.js';
import './css/Mate.css';


export default function Mate() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleFilterClick = () => {
    setFilterVisible((prev) => !prev);
    updateFilterBarHeight();
  };

  const handleConfirmButtonClick = () => {
    setFilterVisible(false);
    updateFilterBarHeight();
  };

  const updateFilterBarHeight = () => {
    const mateFilter = document.querySelector('.Mate-filter');
    if (mateFilter) {
      mateFilter.style.height = isFilterVisible ? '200px' : '100px';
    }
  };

  const setScrollableStyle = () => {
    const mateRecommend = document.querySelector('.Mate-recommend');
    if (mateRecommend) {
      // 조건 추가: Mate-recommend의 실제 너비가 컨테이너를 벗어날 때만 스크롤 적용
      //mateRecommend.style.overflowX = mateRecommend.scrollWidth > mateRecommend.clientWidth ? 'auto' : 'hidden';
      mateRecommend.style.whiteSpace = 'nowrap';
    }
  };

  useEffect(() => {
    setScrollableStyle();
  }, []);

  return (
    <div className={`Mate-container ${isFilterVisible ? 'filter-open' : ''}`}>
      <h4>추천 메이트</h4>
      <div className='Mate-recommend'>
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
        <Mate_Item />
      </div>
      <div className='Mate-main'>
        <div className='Mate-filter'>
          <button onClick={handleFilterClick}>필터링</button>
          {isFilterVisible && <MateFilterBar onConfirm={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-product-list'>
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
          <Mate_Item />
        </div>
      </div>
    </div>
  );
}
