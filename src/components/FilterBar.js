import React from 'react';
import { Checkbox, Slider } from 'antd';
import './FilterBar.css';

const FilterBar = ({
  isMonthly,
  isJeonse,
  jeonseAmount,
  depositAmount,
  monthlyRent,
  onMonthlyChange,
  onJeonseChange,
  onJeonseAmountChange,
  onDepositAmountChange,
  onMonthlyRentChange,
}) => {
  return (
    <div className='filter-bar-container'>
      <div className='filter-item'>
        <Checkbox checked={isMonthly} onChange={onMonthlyChange}>
          월세
        </Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox checked={isJeonse} onChange={onJeonseChange}>
          전세
        </Checkbox>
      </div>
      {isJeonse && (
        <div className='filter-item'>
          <p>전세금</p>
          <Slider
            min={0}
            max={100000000} // 최대 전세금 범위 설정
            value={jeonseAmount}
            onChange={onJeonseAmountChange}
          />
        </div>
      )}
      {isMonthly && (
        <div className='filter-item'>
          <p>보증금</p>
          <Slider
            min={0}
            max={100000000} // 최대 보증금 범위 설정
            value={depositAmount}
            onChange={onDepositAmountChange}
          />
        </div>
      )}
      {isMonthly && (
        <div className='filter-item'>
          <p>월세</p>
          <Slider
            min={0}
            max={5000000} // 최대 월세 범위 설정
            value={monthlyRent}
            onChange={onMonthlyRentChange}
          />
        </div>
      )}
      <hr className='filter-line' />
      <div className='filter-item'>
        <Checkbox>오피스텔만 보기</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>원룸</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>투룸</Checkbox>
      </div>
    </div>
  );
};

export default FilterBar;