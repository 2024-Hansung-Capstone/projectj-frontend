import React, { useState, useEffect } from 'react';
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
    }
  }
`;


export default function Mate() {
  const navigate = useNavigate();
  const [isFilterVisible, setFilterVisible] = useState(false);  // 필터 기능
  const { data, loading, error } = useQuery(FETCH_ALL_USERS);  // gql

  // 필터 클릭 리스너
  const handleFilterClick = () => {
    setFilterVisible(prev => !prev);
  };

  // 필터에서 확인 버튼 클릭 리스너
  const handleConfirmButtonClick = () => {
    setFilterVisible(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  
  return (
    <div className={`Mate-container ${isFilterVisible ? 'filter-open' : ''}`}>
      <h2>님, 추천 메이트 </h2>
      <div className='Mate-recommend'>
        {data.fetchUsers.map((user) => (
          <Mate_Item key={user.id} user={user} />
        ))}
      </div>
      <div className='Mate-main'>
        <div className='Mate-filter'>
          <button onClick={handleFilterClick}> <RiMenu2Line /></button>
          <h4>나와 맞는 메이트를 찾아보세요</h4>
          {isFilterVisible && <MateFilterModal onClose={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-list'>
          <div className='Mate-items'>
            {data.fetchUsers.map((user) => (
              <Mate_Item  key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
