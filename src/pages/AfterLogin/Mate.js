import React, { useState } from 'react';
import MateFilterModal from '../../components/MateFilterModal.js';
import Mate_Item from '../../item/Mate_Item.js';
import './css/Mate.css';

export default function Mate() {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleFilterClick = () => {
    setFilterVisible(prev => !prev);
  };

  const handleConfirmButtonClick = () => {
    setFilterVisible(false);
  };

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
          {isFilterVisible && <MateFilterModal onClose={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-product-list'>
          <div className='product-items'>
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
    </div>
  );
}
