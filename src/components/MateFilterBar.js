import React, { useState } from 'react';
import { Button } from 'antd';
import './css/MateFilterBar.css';

const MateFilterBar = ({ onConfirm }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedMbti, setSelectedMbti] = useState(null);

  const handleRegionClick = (region) => {
    setSelectedRegion(region === selectedRegion ? null : region);
  };

  const handleGenderClick = (gender) => {
    setSelectedGender(gender === selectedGender ? null : gender);
  };

  const handleAgeClick = (age) => {
    setSelectedAge(age === selectedAge ? null : age);
  };

  const handleMbtiClick = (mbti) => {
    setSelectedMbti(mbti === selectedMbti ? null : mbti);
  };

  const handleConfirmClick = () => {
    onConfirm();
  };

  return (
    <div className='filter-bar-container'>
      <div className='filter-item'>
        <h3>지역</h3>
      </div>
      <div className='filter-item'>
        {['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'].map(region => (
          <Button
            key={region}
            type={selectedRegion === region ? 'primary' : 'default'}
            onClick={() => handleRegionClick(region)}
          >
            {region}
          </Button>
        ))}
      </div>
      <div className='filter-item'>
        <h3>성별</h3>
      </div>
      <div className='filter-item'>
        <Button
          type={selectedGender === '남성' ? 'primary' : 'default'}
          onClick={() => handleGenderClick('남성')}
        >
          남성
        </Button>
        <Button
          type={selectedGender === '여성' ? 'primary' : 'default'}
          onClick={() => handleGenderClick('여성')}
        >
          여성
        </Button>
      </div>
      <div className='filter-item'>
        <h3>나이</h3>
      </div>
      <div className='filter-item'>
        {['10대', '20대', '30대', '40대', '50대 이상'].map(age => (
          <Button
            key={age}
            type={selectedAge === age ? 'primary' : 'default'}
            onClick={() => handleAgeClick(age)}
          >
            {age}
          </Button>
        ))}
      </div>
      <div className='filter-item'>
        <h3>MBTI</h3>
      </div>
      <div className='filter-item'>
        {['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'].map(mbti => (
          <Button
            key={mbti}
            type={selectedMbti === mbti ? 'primary' : 'default'}
            onClick={() => handleMbtiClick(mbti)}
          >
            {mbti}
          </Button>
        ))}
      </div>
      <hr className='filter-line' />
      <Button type="primary" onClick={handleConfirmClick}>확인</Button>
    </div>
  );
};

export default MateFilterBar;
