import React from 'react';
import { Link } from 'react-router-dom';
import './css/Oneroom_Item.css';

const Oneroom_Item = ({ roomId, location, price }) => {
  return (
    <Link to={`/oneroom/${roomId}`} className='roomitem-container'>
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
