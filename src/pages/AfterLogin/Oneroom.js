import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../../components/FilterBar';
import './Oneroom.css';

const Oneroom = () => {
  const [isMonthly, setMonthly] = useState(false);
  const [isJeonse, setJeonse] = useState(false);
  const [jeonseAmount, setJeonseAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [monthlyRent, setMonthlyRent] = useState(0);

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
      <div className='main-content'>
        <h2>메인 콘텐츠 (Oneroom)</h2>
      </div>
      <div className='filter-section'>
        <div className='filter-bar'>
          {console.log({
            isMonthly,
            isJeonse,
            jeonseAmount,
            depositAmount,
            monthlyRent,
          })}
          <FilterBar
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
    </div>
  );
};

export default Oneroom;