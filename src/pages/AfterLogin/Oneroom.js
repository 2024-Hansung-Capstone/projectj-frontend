import React, { useState } from 'react';
import OneroomFilterBar from '../../components/OneroomFilterBar';
import Map from '../../components/Map';
import Oneroom_Item from '../../item/Oneroom_Item';
import './css/Oneroom.css';

const Oneroom = () => {
  const [isMonthly, setMonthly] = useState(false);
  const [isJeonse, setJeonse] = useState(false);
  const [jeonseAmount, setJeonseAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);

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

  return (
    <div className='oneroom-container'>
      {/* Toggle 버튼이 전체 영역을 감싸도록 변경 */}
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
        {/* 버튼 아이콘 */}
        {isFilterBarOpen ? (
          <span>&lt;&lt;</span>
        ) : (
          <span>&gt;&gt;</span>
        )}
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
            />
          </div>
        </div>
      )}
      <div className='map-section'>
        <div className='popular-rooms'>
          <h2>인기 원룸 Top 3</h2>
          <div className='popular-room-list'>
            <Oneroom_Item roomImage='/path/to/room1.jpg' location='서울특별시 강남구 논현동' price='30' />
            <Oneroom_Item roomImage='/path/to/room2.jpg' location='서울특별시 서초구 방배동' price='30' />
            <Oneroom_Item roomImage='/path/to/room3.jpg' location='서울특별시 강북구 수유동' price='30' />
          </div>
        </div>
        <Map />
      </div>
    </div>
  );
};

export default Oneroom;
