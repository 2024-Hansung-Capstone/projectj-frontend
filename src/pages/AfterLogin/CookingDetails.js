import React from 'react';
import './css/CookingDetails.css';

const CookingDetails = ({ post }) => {
  const { title, mainImage, content, images } = post;

  return (
    <div className="cooking-details-container">
      <div className="main-image-container">
        <img src={mainImage} className="main-image" />
      </div>
      <div className="details-content">
        <h2>{title}</h2>
        <p>{content}</p>
        <div className="recipe-container">
          {images && images.length > 0 && images.map((image, index) => (
            <div key={index} className="recipe-item">
              <img src={image.preview} alt="레시피 이미지" className="recipe-image" />
              <p>{image.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookingDetails;
