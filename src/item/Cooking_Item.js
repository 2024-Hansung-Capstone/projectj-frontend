// Cooking_Item.js
import React from 'react';
import './Cooking_Item.css';

const Cooking_Item = ({ dishImage, dishTitle, author }) => {
  return (
    <div className='ci-container'>
      <div className='ci-photo'>
        <img className="dish-image" src={dishImage} alt="dish"/>
      </div>
      <div className='ci-title'>
        <h4>{dishTitle}</h4>
      </div>
      <div className='ci-author'>
        <h4>{author}</h4>
      </div>
    </div>
  );
}

export default Cooking_Item;
