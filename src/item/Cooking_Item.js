// Cooking_Item.js
import React from 'react';
import './css/Cooking_Item.css';

const Cooking_Item = ({ dishImage, dishTitle, author }) => {
  return (
    <div className='cookingitem-container'>
      <div className='cookingitem-photo'>
        <img className="dish-image" src={dishImage} alt="dish"/>
      </div>
      <div className='cookingitem-title'>
        <h4>{dishTitle}</h4>
      </div>
      <div className='cookingitem-author'>
        <h4>{author}</h4>
      </div>
    </div>
  );
}

export default Cooking_Item;
