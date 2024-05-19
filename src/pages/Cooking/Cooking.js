import React, { useState, useEffect } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'; 
import { Input, Space } from 'antd'; 
import './css/Cooking.css';

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
  const { Search } = Input;

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, []);

  const handlePostButtonClick = () => {
    navigate('/CookingPost');
  };

  const handleSearch = (value) => {
    console.log('검색어:', value);
  };

  const handleAISearch = (e) => {
    e.preventDefault();
    navigate("/CookingAI");
  };

  const handleItemClick = (cook) => {
    navigate("/CookingDetail", { state: { cook } });
  };

  return (
    <div className='cooking-container'>
      <div className='cook-ai-container'>
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
              <button onClick={handleAISearch}>➔</button>
            </div>
          </div>
        </div>

        <div className='cooking-search-container'>
          <div className='cooking-search'>
            <Space compact>
              <Search placeholder="재료/요리를 검색하세요" onSearch={handleSearch} enterButton />
            </Space>
          </div>
        </div>

        <div className="cooking-item">
          {data && data.fetchAllCooks && data.fetchAllCooks.length > 0 ? (
            <>
              <div className='header'>
                <h1>BEST 레시피</h1>
              </div>
              <div className='cooking-items-container'>
                <p>전체 레시피</p>
                <div className='cooking-dishes-grid'>
                  {data.fetchAllCooks.map((cook) => (
                    <Cooking_Item key={cook.id} cook={cook} onClick={() => handleItemClick(cook)} />
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
