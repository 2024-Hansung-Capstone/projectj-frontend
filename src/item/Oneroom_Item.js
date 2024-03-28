import React from 'react';
import './css/Oneroom_Item.css';

const Oneroom_Item = ({ roomImage, location, price }) => {
  return (
    <div className='roomitem-container'>
      <div className='roomitem-room'>
        <img src={roomImage} alt='room' />
      </div>
      <div className='roomitem-location'>
        {location}
      </div>
      <div className='roomitem-price'>
        {price}
      </div>
    </div>
  );
};

export default Oneroom_Item;
