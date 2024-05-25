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
      {/* 제목 */}
      <div className='cookingitem-menu'>
        <p>{cook.name}</p>
      </div>
      {/* 내용 */}
      <div className='cookingitem-detail'>
        <p>{cook.detail}</p>
      </div>
    </div>
  );
}
