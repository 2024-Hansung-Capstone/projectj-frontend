import React from 'react';
import './css/Cooking_Item.css';

export default function Cooking_Item({ cook, onClick }) {
  if (!cook) {
    return <p>Loading cook data...</p>;
  }
  // 내용이 너무 길면 일정 길이로 자르고 생략 부호를 추가
  const truncatedDetail = cook.detail.length > 100 ? `${cook.detail.substring(0, 100)}...` : cook.detail;


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
        <p>{truncatedDetail}</p>
      </div>
    </div>
  );
}
