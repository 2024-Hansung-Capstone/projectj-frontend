import React, { useState } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import CookingPost from './CookingPost';
import { useNavigate } from 'react-router-dom';
import { Checkbox, Slider, Input, Button } from 'antd';
import './css/Cooking.css';

const Cooking = () => {
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);
  const navigate = useNavigate();
  const { Search } = Input;

  const toggleFilterBar = () => {
    setFilterBarOpen(!isFilterBarOpen);
  };

  const handlePostButtonClick = () => {
    navigate('/CookingPost');
  };
  const handleSearch = (value) => {
    console.log('검색어:', value);
  };
  const handleAISearch = (e) => {
    e.preventDefault();
    navigate("/CookingAI.js");
    // 사용자가 입력한 검색어를 가져와서 처리하는 로직을 여기에 추가합니다.
  };
  return (
    <div className='cooking-container'>
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
      </div>
      {isFilterBarOpen && (
        <div className='filter-section'>
          <div className='filter-bar'>
          </div>
        </div>
      )}
      <div className='map-section'>
      <h2>AI 레시피</h2>
      <div className='cook-ai'>
        <div className='ingredient'>
        <div className='ingredient-inputs'>
          <p>AI에게 레시피를 추천받을 수 있어요</p>
          <input type="text" placeholder="재료" />
          <input type="text" placeholder="양" />
          <input type="text" placeholder="단위"/>
          <button>재료 추가</button>
        </div>

        <div className='cook-ai-input'>
          <p>추가된 재료</p>
          {/* 추가된 재료 위치 */}
          <button onClick={handleAISearch}>➔</button>
        </div>
      </div>
      </div>

      <div className='filter-bar-container'>
      <div className='filter-item'>
        <Input.Group compact>
          <Search placeholder="재료/요리를 검색하세요" onSearch={handleSearch} enterButton />
        </Input.Group>
      </div>
      </div>
        <div className='header'>
          <h1>BEST 레시피</h1>
        </div>
        <div className='best-dishes'>
          <Cooking_Item dishImage='/cookingImage_1.webp' dishTitle='김치볶음밥' author='김엄마' dishDescription={'맛있는 김치볶음밥 레시피'} />
          <Cooking_Item dishImage='/cookingImage_2.webp' dishTitle='비빔국수' author='박막례'  dishDescription={'입맛 없을 때 먹으면 딱 좋은 비빔국수'}/>
          <Cooking_Item dishImage='/cookingImage_3.webp' dishTitle='라볶이' author='백종원'  dishDescription={'간단하게 만드는 라볶이 레시피'}/>
        </div>

        <hr className='divider' />
        <div className='cooking-items-container'>
          <div className='cooking-dishes-grid'>
            {[...Array(40)].map((_, index) => (
              <div key={index} className='dish-item'>
                <Cooking_Item dishImage={`/path/to/image${index % 10}.jpg`} dishTitle={`요리(글) 제목${index}`} author={`글쓴이${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 요리 글 등록</button>
    </div>
  );
};

export default Cooking;
