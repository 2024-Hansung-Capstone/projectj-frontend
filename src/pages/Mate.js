import React, { useState } from 'react';
import MateFilterModal from '../components/MateFilterModal.js';
import Mate_Item from '../item/Mate_Item.js';
import './css/Mate.css';
import { gql, useQuery } from '@apollo/client';

const FETCH_ALL_USERS = gql`
  query {
    fetchUsers {
      id
      name
      email
      gender
      birth_at
      mbti
      phone_number
      is_find_mate
      point
      create_at
    }
  }
`;


export default function Mate() {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const { data, loading, error } = useQuery(FETCH_ALL_USERS);

  const handleFilterClick = () => {
    setFilterVisible(prev => !prev);
  };

  const handleConfirmButtonClick = () => {
    setFilterVisible(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={`Mate-container ${isFilterVisible ? 'filter-open' : ''}`}>
      <h4>추천 메이트</h4>
      <div className='Mate-recommend'>
        {data.fetchUsers.map((user, index) => (
          <Mate_Item key={user.id} user={user} />
        ))}
      </div>
      <div className='Mate-main'>
        <div className='Mate-filter'>
          <button onClick={handleFilterClick}>필터링</button>
          {isFilterVisible && <MateFilterModal onClose={handleConfirmButtonClick} />}
        </div>
        <div className='Mate-product-list'>
          <div className='product-items'>
            {data.fetchUsers.map((user, index) => (
              <Mate_Item key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
