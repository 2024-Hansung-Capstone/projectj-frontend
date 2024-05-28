import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { useQuery, gql } from '@apollo/client';
import './css/CookingAI.css';

const FETCH_RECIPES = gql`
  query FetchRecipes {
    fetchRecipes {
      name
      used_ingredients {
        name
        volume
        volume_unit
      }
      needed_ingredients {
        name
        volume
        volume_unit
      }
      instructions
    }
  }
`;

const CookingAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = location.state || { ingredients: [] };
  const { loading, error, data, refetch } = useQuery(FETCH_RECIPES, {
    variables: { ingredients },
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    refetch();
  }, [location.pathname]);

  const handleNext = () => {
    if (currentIndex < data.fetchRecipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: containerRef.current.offsetWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  if (loading)
    return (
      <div className='loading-spinner'>
        <div className='loading-spinner1'>
          <BeatLoader size={20} color={'yellowgreen'} />
          <p>AI 가 검색 중입니다. 잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  if (error) return <p>Error: {JSON.stringify(error, null, 2)}</p>;

  const handleOnClick = (recipeInstructions, allIngredientsMap, recipeName) => {
    navigate('/CookingPost', {
      state: { recipeInstructions, allIngredientsMap, recipeName },
    });
  };

  const renderInstructions = (instructions) => {
    if (typeof instructions === 'string') {
      return instructions.split('.').map((instruction, idx) => (
        <p key={idx}>{instruction.trim()}</p>
      ));
    }
    if (Array.isArray(instructions)) {
      return instructions.map((instruction, idx) => (
        <p key={idx}>{instruction}</p>
      ));
    }
    return <p>조리 방법이 없습니다.</p>;
  };

  const renderRecipe = (recipe, index) => {
    const allIngredientsMap = new Map();

    recipe.used_ingredients.forEach((ingredient) => {
      allIngredientsMap.set(
        ingredient.name,
        `${ingredient.volume} ${ingredient.volume_unit}`
      );
    });

    recipe.needed_ingredients.forEach((ingredient) => {
      const existingValue = allIngredientsMap.get(ingredient.name);
      if (existingValue) {
        const [existingVolume, existingUnit] = existingValue.split(' ');
        const newVolume =
          parseFloat(existingVolume) + parseFloat(ingredient.volume);
        allIngredientsMap.set(
          ingredient.name,
          `${newVolume} ${existingUnit}`
        );
      } else if (ingredient.name) {
        allIngredientsMap.set(
          ingredient.name,
          `${ingredient.volume} ${ingredient.volume_unit}`
        );
      }
    });

    return (
      <div key={index} className={`ai-recipe`}>
        <p className='ai-recipe-title'>{currentIndex + 1} 번째 레시피</p>
        <p style={{fontSize:'18px'}}>{recipe.name}</p>
        <h3>사용된 재료</h3>
        <ul>
          {recipe.used_ingredients.map((ingredient, idx) => (
            <li key={idx}>
              {ingredient.name}: {ingredient.volume} {ingredient.volume_unit}
            </li>
          ))}
        </ul>

        <h3>필요한 재료</h3>
        <ul>
          {recipe.needed_ingredients
            .filter((ingredient) => ingredient.name)
            .map((ingredient, idx) => (
              <li key={idx}>
                {ingredient.name}: {ingredient.volume} {ingredient.volume_unit}
              </li>
            ))}
        </ul>

        <h3>조리 방법</h3>
        {renderInstructions(recipe.instructions)}
        <button
          onClick={() =>
            handleOnClick(recipe.instructions, allIngredientsMap, recipe.name)
          }
        >
          이 레시피로 글 등록
        </button>
      </div>
    );
  };

  return (
    <div className='ai-container0'>
      <div className='cook-ai-header'>
          <img src="/assets/cook/ai1.png" alt="ai" style={{width:'50px',height: '50px', marginRight:'10px', marginBottom:'5px'}}/>
          <p>총 {data.fetchRecipes.length} 개의 레시피가 검색되었습니다.</p>
        </div>
      
      <div className='ai-container' ref={containerRef}>
        {data.fetchRecipes.length > 0 && renderRecipe(data.fetchRecipes[currentIndex], currentIndex)}
        {currentIndex > 0 && (
          <button className='nav-button left' onClick={handlePrev}> &lt; </button>
        )}
        {currentIndex < data.fetchRecipes.length - 1 && (
          <button className='nav-button right' onClick={handleNext}> &gt; </button>
        )}
      </div>
    </div>
  );
};

export default CookingAI;