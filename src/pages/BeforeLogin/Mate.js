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
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleFilterClick = () => {
    setFilterVisible((prev) => !prev);
  };

  const handleOptionButtonClick = (filter, option) => {
    setSelectedFilters((prev) => ({ ...prev, [filter]: option }));
    // 필터링 옵션 버튼 클릭 시에는 옵션 창을 닫지 않음
  };

  const handleConfirmButtonClick = () => {
    setFilterVisible(false);
    // 확인 버튼 클릭 시에 필터링 옵션 창을 닫음
    // 이 부분에 필요한 로직 추가
  };

  const renderFilterOptions = () => {
    if (isFilterVisible) {
      return (
        <div className="filter-options">
          {Object.keys(filterOptions).map((filter, index) => (
            <div key={index}>
              <p>{`[${filter}]`}</p>
              <ul>
                {filterOptions[filter].map((option, optionIndex) => (
                  <li key={optionIndex}>
                    <label className="button-label">
                      <button
                        id={`${filter}_${optionIndex}`}
                        name={filter}
                        className={selectedFilters[filter] === option ? 'clicked' : ''}
                        onClick={() => handleOptionButtonClick(filter, option)}
                      >
                        {option}
                      </button>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="ok_button">
            <button onClick={handleConfirmButtonClick}>확인</button>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='Mate-container'>
      <h1>자취 메이트</h1>
      <div className='Mate-filter'>
        <button onClick={handleFilterClick}>필터링</button>
        {renderFilterOptions()}
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
  );
}
