import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import OneroomFilterBar from '../../components/OneroomFilterBar';
import Map from '../../components/Map';
import Oneroom_Item from '../../item/Oneroom_Item';
import './css/Oneroom.css';
import { FETCH_ALL_ONE_ROOMS } from '../gql/fetchAllOneRooms';
import { FETCH_TOP_THREE_POPULAR_ROOMS } from '../gql/fetchOneRoomsByViewRank';

const Oneroom = () => {
  const { loading, error, data } = useQuery(FETCH_ALL_ONE_ROOMS);
  const { data: topThreeRoomsData } = useQuery(FETCH_TOP_THREE_POPULAR_ROOMS, { variables: { rank: 3 } });
  const [isMonthly, setMonthly] = useState(false);
  const [isJeonse, setJeonse] = useState(false);
  const [jeonseAmount, setJeonseAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);
  const [isMapVisible, setMapVisible] = useState(false);
  const [isListVisible, setListVisible] = useState(true);

  const toggleFilterBar = () => {
    setFilterBarOpen(!isFilterBarOpen);
  };

  const handleMonthlyChange = () => {
    setMonthly(!isMonthly);
  };

  const handleJeonseChange = () => {
    setJeonse(!isJeonse);
  };

  const handleJeonseAmountChange = (value) => {
    setJeonseAmount(value);
  };

  const handleDepositAmountChange = (value) => {
    setDepositAmount(value);
  };

  const handleMonthlyRentChange = (value) => {
    setMonthlyRent(value);
  };

  const handleMapToggleChange = (e) => {
    setMapVisible(e.target.checked);
  };

  const handleListToggleChange = (e) => {
    setListVisible(e.target.checked);
  };

  return (
    <div className='oneroom-container'>
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
      </div>
      {isFilterBarOpen && (
        <div className='filter-section'>
          <div className='filter-bar'>
            <OneroomFilterBar
              isMonthly={isMonthly}
              isJeonse={isJeonse}
              jeonseAmount={jeonseAmount}
              depositAmount={depositAmount}
              monthlyRent={monthlyRent}
              onMonthlyChange={handleMonthlyChange}
              onJeonseChange={handleJeonseChange}
              onJeonseAmountChange={handleJeonseAmountChange}
              onDepositAmountChange={handleDepositAmountChange}
              onMonthlyRentChange={handleMonthlyRentChange}
              onMapToggleChange={handleMapToggleChange}
              onListToggleChange={handleListToggleChange}
            />
          </div>
        </div>
      )}
      <div className='map-section'>
        <div className='popular-rooms'>
          <h2>내 근처 원룸 시세 현황</h2>
          <div className='popular-room-list'>
          {topThreeRoomsData && topThreeRoomsData.fetchOneRoomsByViewRank.map((room) => (
              <Oneroom_Item
                key={room.id}
                roomImage={`/path/to/image${room.id}.jpg`} // 실제 데이터 구조에 맞게 수정하세요
                location={`${room.dong}, ${room.jibun}`} // 실제 데이터 구조에 맞게 수정하세요
                price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`} // 실제 데이터 구조에 맞게 수정하세요
              />
            ))}
          </div>
        </div>
        <hr className='divider' />
        <div className='oneroom-items-container'>
          {isListVisible && (
            <div className='dishes-grid'>
              {data && data.fetchOneRooms.map((room) => (
                <div key={room.id} className='dish-item'>
                  <Oneroom_Item
                    roomImage={`/path/to/image${room.id % 10}.jpg`} // 실제 데이터 구조에 맞게 수정하세요
                    location={`${room.dong}, ${room.jibun}`} // 실제 데이터 구조에 맞게 수정하세요
                    price={room.is_monthly_rent ? `월세 ${room.monthly_rent} / ${room.deposit}` : `전세 ${room.deposit}`} // 실제 데이터 구조에 맞게 수정하세요
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        {isMapVisible && <Map />}
      </div>
    </div>
  );
};

export default Oneroom;
