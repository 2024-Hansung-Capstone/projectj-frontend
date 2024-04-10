import React from 'react';
import './css/CookingDetails.css';

const CookingDetails = ({ mainImage, title, content, recipes }) => {
  return (
    <div className="cooking-details-container">
      <div className="main-image-container">
        {mainImage ? (
          <img src={mainImage} alt="Main" className="main-image" />
        ) : (
          <div className="no-image">No Image</div>
        )}
      </div>
      <h1 className="title">{title || '요리 글 제목'}</h1>
      <p className="content">{content || '소개글'}</p> {/* 소개글이 없을 경우 '소개글'이라고 표시 */}
      <div className="recipes-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="recipe-item">
              <div className="recipe-image-container">
                {recipe.image ? (
                  <img src={recipe.image} alt={`Recipe ${index + 1}`} className="recipe-image" />
                ) : (
                  <div className="no-image">No Image</div>
                )}
              </div>
              <p className="recipe-text">{recipe.text || `레시피${index + 1}`}</p>
            </div>
          ))
        ) : (
          <div className="no-image">No recipes available</div>
        )}
      </div>
    </div>
  );
}

export default CookingDetails;
