import React, { useState } from 'react';
import CookingFilterBar from '../components/CookingFilterBar';
import Cooking_Item from '../item/Cooking_Item';
import CookingPost from './CookingPost';
import CookingDetails from './CookingDetails';
import { useNavigate } from 'react-router-dom';
import './css/Cooking.css';

const Cooking = () => {
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleFilterBar = () => {
    setFilterBarOpen(!isFilterBarOpen);
  };

  const handlePostButtonClick = () => {
    navigate('/CookingDetails');
  };

  return (
    <div className='cooking-container'>
      {/* Toggle Button */}
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
        {isFilterBarOpen ? (
          <span>&lt;&lt;</span>
        ) : (
          <span>&gt;&gt;</span>
        )}
      </div>
      {/* Filter Section */}
      {isFilterBarOpen && (
        <div className='filter-section'>
          <div className='filter-bar'>
            <CookingFilterBar />
          </div>
        </div>
      )}
      {/* Map Section */}
      <div className='map-section'>
        <div className='header'>
          <h1>이달의 BEST 요리</h1>
        </div>
        <div className='best-dishes'>
          <Cooking_Item dishImage='/cookingImage_1.webp' dishTitle='김치볶음밥' author='김엄마' dishDescription={'맛있는 김치볶음밥 레시피'} />
          <Cooking_Item dishImage='/cookingImage_2.webp' dishTitle='비빔국수' author='박막례'  dishDescription={'입맛 없을 때 먹으면 딱 좋은 비빔국수'}/>
          <Cooking_Item dishImage='/cookingImage_3.webp' dishTitle='라볶이' author='백종원'  dishDescription={'간단하게 만드는 라볶이 레시피'}/>
        </div>
        <hr className='divider' />
        <div className='cooking-items-container'>
          <div className='dishes-grid'>
            {[...Array(40)].map((_, index) => (
              <div key={index} className='dish-item'>
                <Cooking_Item dishImage={`/path/to/image${index % 10}.jpg`} dishTitle={`요리(글) 제목${index}`} author={`글쓴이${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className='post-button' onClick={handlePostButtonClick}> 요리 글 등록</button>
    </div>
  );
};

export default Cooking;
