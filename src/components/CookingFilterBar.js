import React from 'react';
import { Checkbox, Slider, Input, Button } from 'antd';
import './CookingFilterBar.css';

const { Search } = Input;

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
  const handleSearch = (value) => {
    console.log('검색어:', value);
  };

  return (
    <div className='filter-bar-container'>
      <div className='filter-item'>
        <Input.Group compact>
          <Search placeholder="재료/요리를 입력하세요" onSearch={handleSearch} enterButton />
        </Input.Group>
      </div>
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
      {/* 구분선 */}
      <hr className='filter-line' />
      {/* 채식만 보기 */}
      <div className='filter-item'>
        <Checkbox>채식만 보기</Checkbox>
      </div>
    </div>
  );
};

export default CookingFilterBar;
