import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import MateFilterModal from '../../components/MateFilterModal.js';
import { BiCategory } from "react-icons/bi";
import { RiMenu2Line } from "react-icons/ri";
import Mate_Item from '../../item/Mate_Item.js';
import './Mate.css';

// 모든 유저 정보 가져오기
const FETCH_ALL_USERS = gql`
  query {
    fetchUsers {
      id
      name
      gender
      birth_at
      mbti
      is_find_mate
      create_at
      profile_image{
        imagePath
      }
      dong {
        id
        name
      }
    }
  }
`;

const FETCH_ALL_SGNG = gql`
  query FetchAllSgng {
    fetchAllSgng {
      id
      name
    }
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

export default function Mate() {
  const navigate = useNavigate();
  const [isFilterVisible, setFilterVisible] = useState(false);  // 필터 기능
  const [filters, setFilters] = useState({
    region: null,
    gender: null,
    age: null,
    mbti: null
  });
  const { data, loading, error } = useQuery(FETCH_ALL_USERS);  // gql
  const { data: sgngData, loading: sgngLoading, error: sgngError } = useQuery(FETCH_ALL_SGNG);  // gql
  const token = localStorage.getItem('token');

  const { loading: loadingWhoAmI, error: errorWhoAmI, data: dataWhoAmI } = useQuery(WHO_AM_I_QUERY, {
    context: {
      headers: {
        authorization: `Bearer ${token || ''}`
      }
    },
  });

  // 필터 클릭 리스너
  const handleFilterClick = () => {
    setFilterVisible(prev => !prev);
  };

  // 필터에서 확인 버튼 클릭 리스너
  const handleConfirmButtonClick = (selectedFilters) => {
    setFilters(selectedFilters);
    setFilterVisible(false);
  };

  if (loading || loadingWhoAmI) return <p>Loading...</p>;
  if (error || errorWhoAmI) return <p>Error: {error?.message || errorWhoAmI?.message}</p>;

  const whoAmI = dataWhoAmI?.whoAmI;
  
  // 사용자 필터링 함수
  const filteredUsers = data.fetchUsers.filter(user => {
    // 지역 필터링
    if (filters.region) {
      const regionId = sgngData.fetchAllSgng.find(region => region.name === filters.region)?.id;
      const userSgngId = user.dong.id.substring(0, 5); // 사용자의 동 id의 앞 다섯 자리 추출
      if (regionId !== userSgngId) return false;
    }
    // 성별 필터링
    if (filters.gender) {
      const genderValue = filters.gender === '남성' ? 'male' : 'female';
      if (user.gender !== genderValue) return false;
    }
    // 나이 필터링
    if (filters.age) {
      const age = new Date().getFullYear() - new Date(user.birth_at).getFullYear();
      switch (filters.age) {
        case '10대':
          if (age >= 20) return false;
          break;
        case '20대':
          if (age < 20 || age >= 30) return false;
          break;
        case '30대':
          if (age < 30 || age >= 40) return false;
          break;
        case '40대':
          if (age < 40 || age >= 50) return false;
          break;
        case '50대 이상':
          if (age < 50) return false;
          break;
        default:
          break;
      }
    }
    // MBTI 필터링
    if (filters.mbti && user.mbti !== filters.mbti) return false;

    return true;
  });

  return (
    <div className={`Mate-container ${isFilterVisible ? 'filter-open' : ''}`}>
      <h2>{whoAmI.name}님, 추천 메이트 </h2>
      <div className='Mate-recommend'>
        {data.fetchUsers.slice(0, 5).map((user) => ( // Use slice to select the first 5 elements
        <Mate_Item key={user.id} user={user} />
        ))}
      </div>

      <div className='Mate-main'>
        <div className='Mate-filter'>
          <button onClick={handleFilterClick}> 
            <img src='filter.png' alt='filter'/>
          </button>
          <h4>나와 맞는 메이트를 찾아보세요</h4>
          {isFilterVisible && <MateFilterModal onClose={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-list'>
          <div className='Mate-items'>
            {filteredUsers.map((user) => (
              <Mate_Item  key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
