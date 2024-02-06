import React from 'react';
import { Checkbox, Slider } from 'antd';
import './CookingFilterBar.css';

const CookingFilterBar = ({
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
        <h3>종류별 보기</h3>
      </div>
      <div className='filter-item'>
        <Checkbox>밥/죽/떡</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>면</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>국/탕/찌개</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>빵</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>디저트</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>샐러드</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>간식</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>양념/소스</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>차/음료/술</Checkbox>
      </div>
      <div className='filter-item'>
        <Checkbox>기타</Checkbox>
      </div>
      <hr className='filter-line' />
      <div className='filter-item'>
        <Checkbox>채식만 보기</Checkbox>
      </div>
    </div>
  );
};

export default CookingFilterBar;
