import React, { useState, useEffect } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import { useNavigate } from 'react-router-dom';
import { useQuery, gql,useMutation } from '@apollo/client'; 
import { Input, Space } from 'antd'; 
import './css/Cooking.css';

// Cooking: 요리 메인 페이지 (전체 레시피 불러오기 연결됨. AI 레시피, 검색 연결완료 해야합니다.)
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
const SEARCH_COOK = gql`
  query SearchCook($keyword: String!) {
    searchCook(keyword: $keyword) {
      id
      name
      detail
      user {
        id
        name
      }
      post_images {
        id
        imagePath
      }
    }
  }
`;
const FETCH_MY_INGREDIENTS = gql`
  query FetchMyIngredients {
    fetchMyIngredients {
      id
      name
      volume
      volume_unit
    }
  }
`;

const CREATE_INGREDIENT = gql`
  mutation CreateIngredient($createIngredientInput: CreateIngredientInput!) {
    createIngredient(createIngredientInput: $createIngredientInput) {
      id
      name
      volume
      volume_unit
    }
  }
`;
const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($ingredientId: String!) {
    deleteIngredient(ingredient_id: $ingredientId)
  }
`;

const INCREASE_COOK_VIEW = gql`
  mutation IncreaseCookView($id: String!) {
    increaseCookView(id: $id) 
  }
`;

const FETCH_COOKS_BY_VIEW_RANK = gql`
  query FetchCooksByViewRank($rank: Int!) {
    fetchCookByViewRank(rank: $rank) {
      id
      name
      detail
    }
  }
`;
export default function Cooking() {
  const { loading, error, data } = useQuery(FETCH_ALL_COOKS);
  const [increaseView] = useMutation(INCREASE_COOK_VIEW);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { loading: loadingSearch, error: errorSearch, data: dataSearch } = useQuery(SEARCH_COOK, {
    variables: { keyword },
    skip: !keyword
  });
  const { loading: loadingIngredients,error: errorIngredients, data: dataIngredients ,refetch} = useQuery(FETCH_MY_INGREDIENTS);
  const { loading:toploading, error:toperror, data :topdata} = useQuery(FETCH_COOKS_BY_VIEW_RANK, {
    variables: {  rank:1.0 },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [ingredientName, setIngredient] = useState('');
  const [volume, setQuantity] = useState('');
  const [volume_unit, setUnit] = useState('');
  const { Search } = Input;
  const [createIngredient] = useMutation(CREATE_INGREDIENT);
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT);
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
    setKeyword(value);
  };

  // AI 검색 결과 페이지로 이동
  const handleAISearch = (e) => {
    e.preventDefault();
    navigate("/CookingAI");
    
  };
  // Cook 상세 페이지로 이동
  const handleItemClick = (cook) => {
    increaseView({ variables: { id: cook.id }}).then(response => {
      console.log('조회수가 증가되었습니다.', response.data);
    })
    .catch(err => {
      console.error('조회수 증가 에러:', err);
      console.log(JSON.stringify(err, null, 2))

    });
    navigate("/CookingDetails", { state: { cook } });
  };

  // 재료 추가
  const handleAddIngredient = async (e) => {
    e.preventDefault();
    if (ingredientName && volume && volume_unit) {
      try {
        await createIngredient({
          variables: {
            createIngredientInput: {
              name: ingredientName,
              volume: parseFloat(volume),
              volume_unit: volume_unit,
            },
          },
        });
        alert('식재료가 성공적으로 추가되었습니다.');
        await refetch();
      } catch (error) {
        console.error('식재료 추가 중 오류 발생:', error);
        alert('식재료 추가 중 오류가 발생했습니다.');
        
      }
      setIngredient('');
      setQuantity('');
      setUnit('');
    }
  };
  const renderCooks = () => {
    const cooks = keyword ? dataSearch?.searchCook : data?.fetchAllCooks;
    if (loading || loadingSearch) {
      return <p>로딩 중...</p>;
    }

    if (error || errorSearch) {
      return <p>오류 발생: {error?.message || errorSearch?.message}</p>;
    }

    if (!cooks || cooks.length === 0) {
      return <p className='nodata'>등록된 요리가 없습니다.</p>;
    }

    return (
      <div className="cooking-item">
        <div className='header'>
        {
          (topdata && topdata.fetchCookByViewRank ? (
          topdata.fetchCookByViewRank.map((cook) => (
          <p key={cook.id}>인기 요리 이름: {cook.name}</p>))) : 
        (<p>데이터를 가져오는 중 에러가 발생했습니다.</p>))}

        </div>
        <div className='cooking-items-container'>
          <p>전체 레시피</p>
          <div className='cooking-dishes-grid'>
            {cooks.map((cook) => (
              <Cooking_Item key={cook.id} cook={cook} onClick={() => handleItemClick(cook)} />
            ))}
          </div>
        </div>
      </div>
    );
  };
  const handleDeleteIngredient = async (ingredientId) => {
    try {
      // 삭제 요청 보내기
      await deleteIngredient({
        variables: {
          ingredientId: ingredientId,
        },
      });
      // 삭제 성공 시 재료 다시 불러오기
      await refetch();
      alert('식재료가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.log(JSON.stringify(error, null, 2))

      console.error('식재료 삭제 중 오류 발생:', error);
      alert('식재료 삭제 중 오류가 발생했습니다.');
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
              <input type="text" placeholder="재료" value={ingredientName}
                onChange={(e) => setIngredient(e.target.value)}
              />
              <span style={{ margin: '0 10px' }}></span>
              <input type="text" placeholder="양" value={volume}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input type="text" placeholder="단위" value={volume_unit}
                onChange={(e) => setUnit(e.target.value)}
              />
              <button onClick={handleAddIngredient}>추가하기</button>
            </div>
            <div className='cook-ai-input'>
              <p>추가된 재료</p>
              {dataIngredients?.fetchMyIngredients.length === 0 ? (
                <p className="nodata">재료가 없습니다.</p>
                ) : (
                  dataIngredients?.fetchMyIngredients.map((ing) => (
                <div className="ingredient-item" key={ing.id}>
                  <span style={{ margin: '10px 10px 0 10px' }}>{ing.name}</span>
                  <span>{ing.volume}</span>
                  <span>{ing.volume_unit}</span>
                  <button onClick={() => handleDeleteIngredient(ing.id)}>삭제</button>
                </div>)))}
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
        {renderCooks()}
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 요리 글 등록</button>
    </div>
  );
}
