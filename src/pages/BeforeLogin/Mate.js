import React, { useState } from 'react';
import MateFilterBar from '../../components/MateFilterBar';
import './Mate.css';

const userData = [
  { id: 1, name: 'user1', age: 21 },
  { id: 2, name: 'user2', age: 22 },
  { id: 3, name: 'user3', age: 22 },
  { id: 4, name: 'user4', age: 23 },
  { id: 5, name: 'user5', age: 24 },
  { id: 6, name: 'user6', age: 20 },
  { id: 7, name: 'user7', age: 26 },
  { id: 8, name: 'user8', age: 28 },
  { id: 9, name: 'user9', age: 23 },
  { id: 10, name: 'user10', age: 24 },
];

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

  return (
    <div className={`Mate-container ${isFilterVisible ? 'filter-open' : ''}`}>
      <div className='Mate-recommend'>
        <h4>추천 메이트 (카드뷰) </h4>
      </div>
      <div className='Mate-main'>
        <div className='Mate-filter'>
          <button onClick={handleFilterClick}>필터링</button>
          {isFilterVisible && <MateFilterBar onConfirm={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-product-list'>
          {userData.map(user => (
            <div key={user.id} className='Mate-product-item'>
              <img className="user-image" src="/user.jpeg" alt="user"/>
              <h3>{user.name}</h3>
              <p>{`${user.age} 세`}</p>
              <button>로그인 후 쪽지보내기</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
