import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import './css/MateFilterModal.css';

const MateFilterModal = ({ onClose }) => {
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
    const selectedFilters = {
      region: selectedRegion,
      gender: selectedGender,
      age: selectedAge,
      mbti: selectedMbti
    };
    onClose(selectedFilters);
  };

  return (
    <Modal
      title="필터 설정"
      visible={true} // 모달이 보이도록 설정
      footer={[
        <Button key="cancel" onClick={onClose} className='Matefilter-cancelBtn'>
          취소
        </Button>,
        <Button key="confirm" type="primary" onClick={handleConfirmClick} className='Matefilter-okbtn'>
          확인
        </Button>,
      ]}
    >
      <div className='Matefilter-bar-container'>
        <div className='Matefilter-item'>
          <h3>지역</h3>
        </div>
        <div className='Matefilter-items'>
          {['종로구', '중구', '용산구', '성동구', '광진구', '동대문구', '중랑구', '성북구', '강북구', '도봉구', '노원구', '은평구', '서대문구', '마포구', '양천구', '강서구', '구로구', '금천구', '영등포구', '동작구', '관악구', '서초구', '강남구', '송파구', '강동구'].map(region => (
            <Button
              key={region}
              type={selectedRegion === region ? 'primary' : 'default'}
              onClick={() => handleRegionClick(region)}
            >
              {region}
            </Button>
          ))}
        </div>
        <div className='Matefilter-item'>
          <h3>성별</h3>
        </div>
        <div className='Matefilter-items'>
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
        <div className='Matefilter-item'>
          <h3>나이</h3>
        </div>
        <div className='Matefilter-items'>
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
        <div className='Matefilter-item'>
          <h3>MBTI</h3>
        </div>
        <div className='Matefilter-items'>
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
        <hr className='Matefilter-line' />
      </div>
    </Modal>
  );
};

export default MateFilterModal;
