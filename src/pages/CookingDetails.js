import React from 'react';
import './css/CookingDetails.css';

const CookingDetails = ({ mainImage, author, title, content, recipes }) => {
  return (
    <div className="cooking-details-container">
      <div className="ck-main-image-container">
        {mainImage ? (
          <img src={mainImage} alt="메인" className="cooking-main-image" />
        ) : (
          <div className="ck-main-no-image">이미지 없음</div>
        )}
      </div>
      <p className="author">글쓴이</p>
      <h1 className="title">{title || '요리 글 제목'}</h1>
      <p className="content">{content || '소개글'}</p>
      <div className="recipes-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-item">
              <div className="recipe-image-container">
                {recipe.image ? (
                  <img src={recipe.image} alt={`레시피 ${index + 1}`} className="recipe-image" />
                ) : (
                  <div className="recipe-no-image">이미지 없음</div>
                )}
              </div>
              <p className="recipe-text">{recipe.text || `레시피 ${index + 1}`}</p>
            </div>
          ))
        ) : (
          <div className="recipe-no-image">레시피가 없습니다.</div>
        )}
      </div>
      <button className='cooking-chat-button'> 채팅하기</button>
    </div>
  );
}

export default CookingDetails;