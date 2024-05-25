import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { gql, useQuery } from '@apollo/client';
import './css/MateFilterModal.css';

const FETCH_ALL_SGNG = gql`
  query FetchAllSgng {
    fetchAllSgng {
      id
      name
    }
  }
`;

const MateFilterModal = ({ onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedMbti, setSelectedMbti] = useState(null);

  const { loading, error, data } = useQuery(FETCH_ALL_SGNG);

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

  if (loading || !data) return <p>Loading...</p>; 
  
  const regions = data.fetchAllSgng.filter(region => region.id.startsWith("11"));

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
      onCancel={onClose} // "x" 버튼 클릭 시 onClose 함수 호출하여 모달을 닫음
    >
      <div className='Matefilter-bar-container'>
        <div className='Matefilter-item'>
          <h3>지역</h3>
        </div>
        <div className='Matefilter-items'>
          {regions.map(region => (
            <Button
              key={region.id}
              type={selectedRegion === region.name ? 'primary' : 'default'}
              onClick={() => handleRegionClick(region.name)}
            >
              {region.name}
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
