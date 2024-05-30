import React, { useState, useEffect, useRef } from 'react';
import Cooking_Item from '../../item/Cooking_Item';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client'; 
import { Input, Space } from 'antd'; 
import './css/Cooking.css';

// GraphQL queries and mutations
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
      view
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
// 조회수 증가
const INCREASE_COOK_VIEW = gql`
  mutation IncreaseCookView($id: String!) {
    increaseCookView(id: $id) {
      id
      view
    } 
  }
`;
// 인기 레시피
const FETCH_COOKS_BY_VIEW_RANK = gql`
  query FetchCooksByViewRank($rank: Float!) {
    fetchCookByViewRank(rank: $rank) {
      id
      name
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;
// 재료 수정
const UPDATE_INGREDIENT = gql`
  mutation UpdateIngredient($updateIngredientInput: UpdateIngredientInput!) {
    updateIngredient(updateIngredientInput: $updateIngredientInput) {
      id
      name
      volume
      volume_unit
    }
  }
`;

export default function Cooking() {
  const { loading, error, data, refetch: refetchAll } = useQuery(FETCH_ALL_COOKS);
  const [increaseView] = useMutation(INCREASE_COOK_VIEW);
  const location = useLocation();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');
  const { loading: loadingSearch, error: errorSearch, data: dataSearch } = useQuery(SEARCH_COOK, {
    variables: { keyword },
    skip: !keyword,
  });
  const { loading: loadingIngredients, error: errorIngredients, data: dataIngredients, refetch } = useQuery(FETCH_MY_INGREDIENTS);
  const { loading: toploading, error: toperror, data: topdata } = useQuery(FETCH_COOKS_BY_VIEW_RANK, {
    variables: { rank: 1.0 },
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const [ingredientName, setIngredient] = useState('');
  const [volume, setQuantity] = useState('');
  const [volume_unit, setUnit] = useState('');
  const { Search } = Input;
  const [createIngredient] = useMutation(CREATE_INGREDIENT);
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT);
  const [updateIngredient] = useMutation(UPDATE_INGREDIENT);
  const inputRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => { // 토큰
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    const loggedInUser = localStorage.getItem('loggedInUserName'); // 로그인 유저
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, [isLoggedIn]); // isLoggedIn 상태가 변경될 때마다 실행

  // 로컬 스토리지에 저장된 재료 정보가 있는지 확인하고, 있으면 해당 정보를 상태에 설정합니다.
useEffect(() => {
  const storedIngredientName = localStorage.getItem('ingredientName');
  const storedVolume = localStorage.getItem('volume');
  const storedVolumeUnit = localStorage.getItem('volume_unit');
  
  if (storedIngredientName && storedVolume && storedVolumeUnit) {
    setIngredient(storedIngredientName);
    setQuantity(storedVolume);
    setUnit(storedVolumeUnit);
  }
}, []);


  useEffect(() => {
    refetchAll().then((result) => {
      console.log(result.data);
    });
  }, [location.pathname]);

  // 레시피 등록 버튼
  const handlePostButtonClick = () => {
    navigate('/CookingPost');
  };

  // 레시피 검색
  const handleSearch = () => {
    const value = inputRef.current.value;
    setKeyword(value);

  };

  // AI 검색
  const handleAISearch = (e) => {
    e.preventDefault();
    if (dataIngredients.fetchMyIngredients.length ===0) {
      alert("재료를 입력해주세요");
      return;
    }
    navigate('/CookingAI')
  };

  // 조회수
  const handleItemClick = (cook) => {
    increaseView({ variables: { id: cook.id } })
      .then(response => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('조회수 증가 에러:', err);
        console.log(JSON.stringify(err, null, 2));
      });
    navigate("/CookingDetails", { state: { cook } });
  };

  
// 재료 추가
  const handleAddIngredient = async (e) => {
    e.preventDefault();
    if (ingredientName && volume && volume_unit) {
      try {
        localStorage.setItem('ingredientName', ingredientName);
        localStorage.setItem('volume', volume);
        localStorage.setItem('volume_unit', volume_unit);

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

// 재료 삭제
  const handleDeleteIngredient = async (ingredientId) => {
    try {
      await deleteIngredient({
        variables: {
          ingredientId: ingredientId,
        },
      });
      await refetch();
      alert('식재료가 성공적으로 삭제되었습니다.');
    } catch (error) {
      console.error('식재료 삭제 중 오류 발생:', error);
      alert('식재료 삭제 중 오류가 발생했습니다.');
    }
  };

  // 재료 수정
  const [isEditing, setIsEditing] = useState(false);
  const [editedIngredient, setEditedIngredient] = useState({
    id: "",
    name: "",
    volume: "",
    volume_unit: ""
  });

  const handleUpdateIngredient = (ingredientId, name, volume, volume_unit) => {
    setIsEditing(true); // 수정 폼을 보여줌
    setEditedIngredient({
      id: ingredientId,
      name: name,
      volume: volume,
      volume_unit: volume_unit
    });
  };

  const handleFinishEdit = async () => {
    try {
      await updateIngredient({
        variables: {
          updateIngredientInput: {
            id: editedIngredient.id,
            name: editedIngredient.name,
            volume: parseFloat(editedIngredient.volume),
            volume_unit: editedIngredient.volume_unit,
          },
        },
      });
      setIsEditing(false); // 수정 폼을 닫음
      await refetch(); // 재료 정보를 다시 불러옴
      alert('재료 정보가 성공적으로 수정되었습니다.');
    } catch (error) {
      console.error('재료 정보 수정 중 오류 발생:', error);
      alert('재료 정보 수정 중 오류가 발생했습니다.');
    }
  };

  // 레시피 줄바꿈
  const renderDetailItems = (detail) => {
    if (typeof detail === 'string') {
      return detail.split(',').map((item, index) => (
        <p key={index} className="detail-item">{item.trim()}</p>
      ));
    }
  };

  const renderPagination = () => {
    const cooks = keyword ? dataSearch?.searchCook : data?.fetchAllCooks;
    const pageCount = Math.ceil(cooks.length / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(i);
    }
    return (
      <div className="pagination">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    );
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

    const startIndex = (currentPage - 1) * itemsPerPage;
    const selectedCooks = cooks.slice(startIndex, startIndex + itemsPerPage);

    return (
      <div className="cooking-item">
        <div className="cooking-header">
          <div className="cooking-header1">
            <img src="/assets/cook/top.png" alt="Top" />
            <p>인기 레시피  BEST</p>
          </div>
          <div className="best-dishes">
            {topdata && topdata.fetchCookByViewRank ? (
              topdata.fetchCookByViewRank.map((cook) => (
                <div className="best-dish" key={cook.id}>
                  {cook.post_images && cook.post_images.length > 0 && (
                    <img src={cook.post_images[0].imagePath} alt={cook.name} />
                  )}
                  <div className="best-dish-context">
                    <div className="dish-name">
                      <h3>{cook.name}</h3>
                    </div>
                    <div className="dish-details">
                      {/* ","로 분할된 항목을 p 태그로 렌더링 */}
                      {renderDetailItems(cook.detail)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <pre>{JSON.stringify(toperror, null, 2)}</pre>
            )}
          </div>
        </div>
        <div className='custom-search-container'>
          <div className='custom-search'>
            <input 
              type="text" 
              placeholder="재료/요리를 검색하세요" 
              ref={inputRef}
              className='custom-search-input'
            />
            <button onClick={handleSearch} className='custom-search-button'>검색</button>
          </div>
        </div>
        <div className='cooking-items-container'>
          <div className='cooking-items-header'>
            <img src="/assets/cook/cook2.png" alt="cook" style={{width: '40px', marginRight:'10px'}} />
            <p style={{fontSize:'24px'}}>전체 레시피</p>
          </div>
          <div className='cooking-dishes-grid'>
            {selectedCooks.map((cook) => (
              <Cooking_Item key={cook.id} cook={cook} onClick={() => handleItemClick(cook)} />
            ))}
          </div>
        </div>
        {renderPagination()}
      </div>
    );
  };

  return (
    <div className='cooking-container'>
      <div className='cook-ai-container'>
        <div className='cook-ai-header'>
          <img src="/assets/cook/ai1.png" alt="ai" style={{ width: '50px', height: '50px', marginRight: '10px', marginBottom: '5px' }} />
          <p style={{ fontSize: '30px' }}>AI 레시피</p>
        </div>
        <div className='cook-ai'>
          <div className='ingredient'>
            <div className='ingredient-inputs'>
              <p>냉장고 속 재료를 입력해볼까요?</p>
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
              <p style={{ color: 'rgb(93, 155, 0)', fontSize: '15px' }}>[ 추가된 재료 ]</p>
              {dataIngredients?.fetchMyIngredients.length === 0 ? (
                <p className="cooking-nodata">재료가 없습니다.</p>
              ) : (
                dataIngredients?.fetchMyIngredients.map((ing) => (
                  <React.Fragment key={ing.id}>
                    {isEditing && editedIngredient.id === ing.id ? (
                      <div className="edit-ingredient-form">
                        <input
                          type="text"
                          value={editedIngredient.name}
                          onChange={(e) => setEditedIngredient({ ...editedIngredient, name: e.target.value })}
                        />
                        <input
                          type="text"
                          value={editedIngredient.volume}
                          onChange={(e) => setEditedIngredient({ ...editedIngredient, volume: e.target.value })}
                        />
                        <input
                          type="text"
                          value={editedIngredient.volume_unit}
                          onChange={(e) => setEditedIngredient({ ...editedIngredient, volume_unit: e.target.value })}
                        />
                        <button onClick={() => handleFinishEdit()}>수정 완료</button>
                      </div>
                    ) : (
                      <div className="ingredient-item">
                        <div className="ingredient-item-container" style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginRight: '12px' }}>{ing.name}</span>
                          <span style={{ marginRight: '5px' }}>{ing.volume}</span>
                          <span>{ing.volume_unit}</span>
                        </div>
                        <button className="update-ingredient-btn" onClick={() => handleUpdateIngredient(ing.id, ing.name, ing.volume, ing.volume_unit)}>수정</button>
                        <button className="cookingDelete-btn" onClick={() => handleDeleteIngredient(ing.id)}>삭제</button>
                      </div>
                    )}
                  </React.Fragment>
                ))
              )}
              <button onClick={handleAISearch}>➔</button>
            </div>
          </div>
        </div>
        {renderCooks()}
      </div>
      <button className='post-button2' onClick={handlePostButtonClick} style={{ backgroundColor: '#29ADB2' }}> 레시피 등록</button>
    </div>
  );
}
