import React from 'react';
import { Link } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import './css/Oneroom_Item.css';

export const INCREASE_ONE_ROOM_VIEW_MUTATION = gql`
  mutation IncreaseOneRoomView($oneRoom_id: String!) {
    inceaseOneRoomView(oneRoom_id: $oneRoom_id) {
      id
      view
    }
  }
`;

const Oneroom_Item = ({ roomId, location, price, className, area }) => {
  const [increaseOneRoomView] = useMutation(INCREASE_ONE_ROOM_VIEW_MUTATION);

  const handleClick = async () => {
    try {
      await increaseOneRoomView({ variables: { oneRoom_id: roomId } });
    } catch (error) {
      console.error("Failed to increase view count", error);
    }
    console.log('조회되었습니다.');
  };

  // price를 분수 형태에서 변환하여 처리
  const convertPrice = (priceString) => {
    if (priceString.includes('월세')) {
      const [monthlyRent, deposit] = priceString.replace('월세 ', '').split(' / ');
      const convertedMonthlyRent = parseInt(monthlyRent, 10) * 10; // 월세 * 10
      const convertedDeposit = parseInt(deposit, 10) * 10; // 보증금 * 10
      return `월세 ${convertedMonthlyRent} / ${convertedDeposit}`;
    } else if (priceString.includes('전세')) {
      const deposit = priceString.replace('전세 ', '');
      const depositNumber = parseInt(deposit, 10);
  
      if (depositNumber >= 10) {
        const billions = Math.floor(depositNumber / 10); // 억 단위
        const thousands = depositNumber % 10; // 천 단위
        return thousands > 0 
          ? `전세 ${billions}억 ${thousands}000` 
          : `전세 ${billions}억`;
      } else {
        const convertedDeposit = depositNumber * 1000; // 천 단위
        return `전세 ${convertedDeposit}`;
      }
    }
    return priceString;
  };
  const formattedPrice = convertPrice(price);

  return (
    <Link to={`/oneroom/${roomId}`} className={className} onClick={handleClick}>
        <div className='roomitem-price'>{formattedPrice}</div>
        <div className='roomitem-area'><p>{area || '정보 없음'}m²</p></div>
        <div className='roomitem-location'>{location} </div>
    </Link>
  );
};

export default Oneroom_Item;
