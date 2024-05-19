import React from 'react';
import { Link } from 'react-router-dom';
import './css/Oneroom_Item.css';

const Oneroom_Item = ({ roomId, location, price, className }) => {
  return (
    <Link to={`/oneroom/${roomId}`} className={className}>
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
