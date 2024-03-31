import React from 'react';
import { Link } from 'react-router-dom';
import './css/Category.css';

const Category = () => {
  const categories = ["홈", "요리", "원룸", "자취메이트", "중고마켓", "커뮤니티"];

  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={category === "홈" ? '/' : 
          category === "요리" ? '/Cooking' : 
          category === "원룸" ? '/Oneroom' : 
          category === "자취메이트" ? '/Mate' : 
          category === "중고마켓" ? '/Market' : 
          category === "커뮤니티" ? '/Community' : 
          `/${category.toLowerCase()}`}
          className="category-item"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Category;
