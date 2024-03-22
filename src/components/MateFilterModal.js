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
    // 필터 설정을 완료하고 모달을 닫기
    onClose();
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
