import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/Category.css';

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태 초기화

  const categories = ["홈", "요리", "원룸", "자취메이트", "중고마켓", "커뮤니티"];

  const handleCategoryClick = (index) => {
    setSelectedCategory(index); // 클릭된 카테고리의 인덱스를 선택된 카테고리 상태로 설정
  };

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
          className={`category-item ${selectedCategory === index ? 'active' : ''}`} // 선택된 카테고리에 active 클래스 추가
          onClick={() => handleCategoryClick(index)} // 카테고리 클릭 시 선택된 카테고리 변경
        >
          {category}
        </Link>
      ))}
    </div>
  );
};

export default Category;
