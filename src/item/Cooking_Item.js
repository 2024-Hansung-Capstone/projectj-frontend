import React from 'react';
import './css/Cooking_Item.css';

export default function Cooking_Item({ cook, onClick }) {
  if (!cook) {
    return <p>Loading cook data...</p>;
  }

  return (
    <div className='cookingitem-container' onClick={() => onClick(cook)}>
      <div className='cookingitem-photo'>
        {cook.post_images.length > 0 ? (
          <>
            <img className="main-dish-image" src={cook.post_images[0].imagePath} alt="main-dish" />
          </>
        ) : (
          <p>No image available</p>
        )}
      </div>
      <div className='cookingitem-menu'>
        <p>제목: {cook.name}</p>
      </div>
      <div className='cookingitem-detail'>
        <p>내용: {cook.detail}</p>
      </div>
    </div>
  );
}
