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

const Oneroom_Item = ({ roomId, location, price, className }) => {
  const [increaseOneRoomView] = useMutation(INCREASE_ONE_ROOM_VIEW_MUTATION);

  const handleClick = async () => {
    try {
      await increaseOneRoomView({ variables: { oneRoom_id: roomId } });
    } catch (error) {
      console.error("Failed to increase view count", error);
    }
    console.log('조회되었습니다.');
  };

  return (
    <Link to={`/oneroom/${roomId}`} className={className} onClick={handleClick}>
      <div className='roomitem-location'>
        {location}
      </div>
      <div className='roomitem-price'>
        {price}
      </div>
    </Link>
  );
};

export default Oneroom_Item;
