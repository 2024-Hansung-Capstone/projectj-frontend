import React from 'react';
import './css/Cooking_Item.css';

export default function Cooking_Item({ cook, onClick }) {
  if (!cook) {
    return <p>Loading cook data...</p>;
  }

  const truncatedDetail = cook.detail.length > 100 ? `${cook.detail.substring(0, 50)}...` : cook.detail;

  const renderDetailItems = (detail) => {
    if (typeof detail === 'string') {
      return detail.split(',').map((item, index) => (
        <p key={index} className="detail-item">{item.trim()}</p>
      ));
    }
  };

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
        <p className="cookingitem-name">{cook.name}</p>
      </div>
      <div className='cookingitem-detail'>
        {renderDetailItems(truncatedDetail)}
      </div>
    </div>
  );
}
