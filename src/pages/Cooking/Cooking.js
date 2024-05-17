import React, { useState, useEffect } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { useQuery, useLazyQuery } from '@apollo/client';
import { SEARCH_COOK } from '../gql/SearchCookGql';
import { FETCH_ALL_COOKS } from '../gql/fetchAllCooksGql';
import './css/Cooking.css';

const Cooking = () => {
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const [quantityInput, setQuantityInput] = useState('');
  const [unitInput, setUnitInput] = useState('');
  const [cooks, setCooks] = useState([]);

  const navigate = useNavigate();
  const { Search } = Input;

  const { data: allCooksData } = useQuery(FETCH_ALL_COOKS);
  const [searchCook, { data: searchCookData }] = useLazyQuery(SEARCH_COOK);

  useEffect(() => {
    if (allCooksData) {
      setCooks(allCooksData.fetchAllCooks);
    }
  }, [allCooksData]);

  useEffect(() => {
    if (searchCookData) {
      setCooks(searchCookData.searchCook);
    }
  }, [searchCookData]);

  const toggleFilterBar = () => {
    setFilterBarOpen(!isFilterBarOpen);
  };

  const handlePostButtonClick = () => {
    navigate('/CookingPost');
  };

  const handleSearch = async (value) => {
    try {
      const { data } = await SEARCH_COOK({
        variables: { keyword: value }
      });
      console.log('검색 결과:', data.searchCook);
    } catch (error) {
      console.error('검색 중 오류가 발생했습니다:', error);
    }
  };

  const handleAISearch = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert('재료를 추가해주세요');
    } else {
      navigate('/CookingAI', { state: { ingredients } });
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput && quantityInput && unitInput) {
      const newIngredient = `${ingredientInput} ${quantityInput}${unitInput}`;
      setIngredients([...ingredients, newIngredient]);
      setIngredientInput('');
      setQuantityInput('');
      setUnitInput('');
    }
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
              <input 
                type="text" 
                placeholder="재료" 
                value={ingredientInput}
                onChange={(e) => setIngredientInput(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="양" 
                value={quantityInput}
                onChange={(e) => setQuantityInput(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="단위" 
                value={unitInput}
                onChange={(e) => setUnitInput(e.target.value)}
              />
              <button onClick={handleAddIngredient}>재료 추가</button>
            </div>
            <div className='cook-ai-input'>
              <p>추가된 재료</p>
              <ul>
                {ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <button onClick={handleAISearch}>➔</button>
            </div>
          </div>
        </div>

        <div className='filter-bar-container'>
          <div className='filter-item'>
            <Input.Group compact>
              <Search placeholder="요리를 검색하세요" onSearch={handleSearch} enterButton />
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
            {cooks.map((cook, index) => (
              <div key={index} className='dish-item'>
                <Cooking_Item 
                  dishImage={cook.post_images[0].url} 
                  dishTitle={cook.name} 
                  author={cook.author} 
                  dishDescription={cook.detail}
                />
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
