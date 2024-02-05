import React from 'react';
import { Link } from 'react-router-dom';
import './Category.css';

const Category = () => {
  const categories = ["홈", "요리", "원룸", "자취메이트", "커뮤니티"];

  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={category === "홈" ? '/' : category === "자취메이트" ? '/Mate' : category === "원룸" ? '/Oneroom' : `/${category.toLowerCase()}`}
          className="category-item"
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Category;