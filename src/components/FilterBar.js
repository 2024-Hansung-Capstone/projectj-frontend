import React from 'react';
import { Checkbox, Slider } from 'antd'; // 예시로 Ant Design의 Checkbox와 Slider 컴포넌트 사용

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
      <div className='filter-item'>
        <p>보증금</p>
        <Slider
          min={0}
          max={100000000} // 최대 보증금 범위 설정
          value={depositAmount}
          onChange={onDepositAmountChange}
        />
      </div>
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
    </div>
  );
};

export default FilterBar;
