import React, { useState, useEffect } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'; 
import { Input, Space } from 'antd'; 
import './css/Cooking.css';

// Cooking: 요리 메인 페이지 (전체 레시피 불러오기 연결됨. AI 레시피, 검색 연결해야합니다.)
// CookingPost: 레시피 등록 페이지 (이미지 연결중입니다. name, detail은 연결됨)
// CookingDetail: 레시피 상세 정보 (수정, 삭제 추가해야합니다. )
// CookingAI: AI검색 결과 페이지


// 전체 레시피 불러오기
const FETCH_ALL_COOKS = gql`
  query FetchAllCooks {
    fetchAllCooks {
      id
      user {
        id
        name
      }
      name
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;


export default function Cooking() {
  const { loading, error, data } = useQuery(FETCH_ALL_COOKS);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const { Search } = Input;

  useEffect(() => { // 토큰
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    
    const loggedInUser = localStorage.getItem('loggedInUserName'); // 로그인 유저
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, []);

  // 글 작성
  const handlePostButtonClick = () => {
    navigate('/CookingPost');
  };
  // 검색창
  const handleSearch = (value) => {
    console.log('검색어:', value);
  };

  // AI 검색 결과 페이지로 이동
  const handleAISearch = (e) => {
    e.preventDefault();
    navigate("/CookingAI");
  };
  // 레시피 상세 페이지로 이동
  const handleItemClick = (cook) => {
    navigate("/CookingDetails", { state: { cook } });
  };

  // 재료 추가
  const handleAddIngredient = () => {
    if (ingredient && quantity && unit) {
      const newIngredient = { ingredient, quantity, unit };
      setIngredients([...ingredients, newIngredient]);
      setIngredient('');
      setQuantity('');
      setUnit('');
    }
  };

  return (
    <div className='cooking-container'>
      <div className='cook-ai-container'>
        <h2>AI 레시피</h2>

        {/* AI 검색 */}
        <div className='cook-ai'>
          <div className='ingredient'>
            {/* 재료 입력 받기 */}
            <div className='ingredient-inputs'>
              <p>AI에게 레시피를 추천받을 수 있어요</p>
              <input type="text" placeholder="재료" value={ingredient}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <span style={{ margin: '0 10px' }}></span>
              <input type="text" placeholder="양" value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input type="text" placeholder="단위" value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <button onClick={handleAddIngredient}>추가하기</button>
            </div>
            <div className='cook-ai-input'>
              <p>추가된 재료</p>
              <div className='added-ingredients'>
                {ingredients.map((ing, index) => (
                  <div key={index} className='ingredient-item'>
                    <span style={{ margin: '10px 10px 0 10px' }}>{ing.ingredient}</span>
                    <span>{ing.quantity}</span>
                    <span>{ing.unit}</span>
                  </div>
                ))}
              </div> 
              {/* AI 검색 결과 페이지로 이동 */}
              <button onClick={handleAISearch}>➔</button>
            </div>
          </div>
        </div>

        {/* 레시피 검색 */}
        <div className='cooking-search-container'>
          <div className='cooking-search'>
            <Space compact>
              <Search placeholder="재료/요리를 검색하세요" onSearch={handleSearch} enterButton />
            </Space>
          </div>
        </div>

        {/* 전체 레시피 */}
        <div className="cooking-item">
          {data && data.fetchAllCooks && data.fetchAllCooks.length > 0 ? (
            <>
              <div className='header'>
                {/* <h1>BEST 레시피</h1> */}
              </div>
              <div className='cooking-items-container'>
                <p>전체 레시피</p>
                <div className='cooking-dishes-grid'>
                  {data.fetchAllCooks.map((cook) => (
                    <Cooking_Item key={cook.id} cook={cook} onClick={handleItemClick} />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <p className='nodata'>등록된 요리가 없습니다.</p>
          )}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 요리 글 등록</button>
    </div>
  );
}
