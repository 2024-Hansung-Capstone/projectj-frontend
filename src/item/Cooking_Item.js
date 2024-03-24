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
        <p>제목</p>
      </div>
      <div className='cookingitem-author'>
        <h4>{author}</h4>
        <p>글쓴이</p>
      </div>
      <div className='cookingitem-content'>
        <h4></h4>
        <p>내용</p>
      </div>
    </div>
  );
}

export default Cooking_Item;
