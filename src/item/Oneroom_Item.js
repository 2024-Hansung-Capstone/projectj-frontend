import React from 'react';
import './css/Oneroom_Item.css';

const Oneroom_Item = ({ roomImage, location, price }) => {
  return (
    <div className='roomitem-container'>
      <div className='roomitem-room'>
        <img src={roomImage} alt='room' />
        <p>매물</p>
      </div>
      <div className='roomitem-location'>
        {location}
        <p>위치</p>
      </div>
      <div className='roomitem-price'>
        {price}
        <p>가격</p>
      </div>
    </div>
  );
};

export default Oneroom_Item;
