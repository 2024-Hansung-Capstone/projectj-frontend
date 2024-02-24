import React from 'react';
import './Oneroom_Item.css';

const Oneroom_Item = ({ roomImage, location }) => {
  return (
    <div className='room-item'>
      <img src={roomImage} alt='room' />
      <p className='location'>{location}</p>
    </div>
  );
};

export default Oneroom_Item;
