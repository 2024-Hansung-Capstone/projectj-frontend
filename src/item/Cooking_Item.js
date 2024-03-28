import React from 'react';
import './css/Cooking_Item.css';

const Cooking_Item = ({ dishImage, dishTitle, author, dishDescription }) => {
  return (
    <div className='cookingitem-container'>
      <div className='cookingitem-photo'>
        <img className="dish-image" src={dishImage} alt="dish"/>
      </div>
      <div className='cookingitem-title'>
        <p>{dishTitle}</p>
      </div>
      <div className='cookingitem-author'>
        <p>{author}</p>
      </div>
      <div className='cookingitem-content'>
        <p>{dishDescription}</p>
      </div>
    </div>
  );
}

export default Cooking_Item;
