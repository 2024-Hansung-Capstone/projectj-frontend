import React, { useState } from 'react';
import OneroomFilterBar from '../components/OneroomFilterBar';
import Map from '../components/Map';
import Oneroom_Item from '../item/Oneroom_Item';
import './css/Oneroom.css';

const Oneroom = () => {
  const [isMonthly, setMonthly] = useState(false);
  const [isJeonse, setJeonse] = useState(false);
  const [jeonseAmount, setJeonseAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);
  const [isMapVisible, setMapVisible] = useState(false);

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

  return (
    <div className='oneroom-container'>
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
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
              onMapToggleChange={handleMapToggleChange}
            />
          </div>
        </div>
      )}
      <div className='map-section'>
        <div className='popular-rooms'>
          <h2>인기 원룸 Top 3</h2>
          <div className='popular-room-list'>
            <Oneroom_Item roomImage='/oneroomImage_1.webp' location='서울특별시 강남구 논현동' price='월세 90 / 2000' />
            <Oneroom_Item roomImage='/oneroomImage_2.webp' location='서울특별시 서초구 방배동' price='월세 70 / 1000' />
            <Oneroom_Item roomImage='/oneroomImage_3.webp' location='서울특별시 강북구 수유동' price='월세 30 / 500' />
          </div>
        </div>
        {isMapVisible && <Map />}
      </div>
    </div>
  );
};

export default Oneroom;