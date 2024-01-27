// Mate.js

import React, { useState } from 'react';
import './Mate.css';

const filterOptions = {
  "지역": ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"],
  "성별": ["남성", "여성"],
  "나이": ["10대", "20대", "30대", "40대", "50대 이상"],
  "MBTI": ["ISTJ", "ISFJ", "INFJ", "INTJ", "ISTP", "ISFP", "INFP", "INTP", "ESTP", "ESFP", "ENFP", "ENTP", "ESTJ", "ESFJ", "ENFJ", "ENTJ"],
};

const userData = [
  { id: 1, name: 'user1', age: 21 },
  { id: 2, name: 'user2', age: 22 },
  { id: 3, name: 'user3', age: 22 },
  { id: 4, name: 'user4', age: 23 },
  { id: 5, name: 'user5', age: 24 },
];

export default function Mate() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterClick = (filter) => {
    setFilterVisible((prev) => !prev);
    setSelectedFilter((prev) => (prev === filter ? null : filter));
  };

  const renderFilterOptions = () => {
    if (isFilterVisible) {
      return (
        <div className="filter-options">
          {Object.keys(filterOptions).map((filter, index) => (
            <button key={index} onClick={() => setSelectedFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderSelectedFilterOptions = () => {
    if (selectedFilter && (selectedFilter === "지역" || selectedFilter === "성별" || selectedFilter === "나이" || selectedFilter === "MBTI")) {
      return (
        <div className="selected-filter-options">
          {filterOptions[selectedFilter].map((option, index) => (
            <div key={index} className="filter-option">
              <input type="radio" name={selectedFilter} value={option} />
              <label>{option}</label>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className='Mate-container'>
      <h1>자취 메이트</h1>
      <div className='Mate-filter'>
        <button onClick={() => handleFilterClick("카테고리")}>카테고리</button>
        {renderFilterOptions()}
        {renderSelectedFilterOptions()}
      </div>
      <div className='Mate-product-list'>
        {userData.map(user => (
          <div key={user.id} className='Mate-product-item'>
            <img className="user-image" src="/user.jpeg" alt="user"/>
            <h3>{user.name}</h3>
            <p>{`${user.age} 세`}</p>
            <button>채팅하기</button>
          </div>
        ))}
      </div>
    </div>
  );
}
