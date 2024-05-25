import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './css/CookingAI.css';

// AI 검색 결과 가져오기
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

// AI 결과 페이지
const CookingAI = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ingredients } = location.state || { ingredients: [] };
  const { loading, error, data,refetch } = useQuery(FETCH_RECIPES, {
    variables: { ingredients },
  });
  useEffect(() => {
    refetch()
  }, [location.pathname]);
  if (loading) return <p>레시피를 불러오는 중...</p>;
  if (error) return <p>Error: {JSON.stringify(error, null, 2)}</p>;
const handelOnClick =  (recipeInstructions, allIngredientsMap,recipeName) => {
  console.log('Recipe Index:', recipeInstructions);
  console.log('All Ingredients Map:', allIngredientsMap);

  navigate('/CookingPost', { state: { recipeInstructions, allIngredientsMap,recipeName} }); 
}
  
  return (
    <div className="ai-container">
      {data.fetchRecipes.map((recipe, index) => {
        const allIngredientsMap = new Map(); // 반복문 내에서 맵 선언

        recipe.used_ingredients.forEach((ingredient) => {
          allIngredientsMap.set(ingredient.name, `${ingredient.volume} ${ingredient.volume_unit}`);
        });
        recipe.needed_ingredients.forEach((ingredient) => {
          const existingValue = allIngredientsMap.get(ingredient.name);
          if (existingValue) {
            // 기존에 있는 키인 경우, 기존 값에 새로운 값을 더함
            const [existingVolume, existingUnit] = existingValue.split(' ');
            const newVolume = parseFloat(existingVolume) + parseFloat(ingredient.volume);
            allIngredientsMap.set(ingredient.name, `${newVolume} ${existingUnit}`);
          } else {
            // 기존에 없는 키인 경우, 그대로 추가
            allIngredientsMap.set(ingredient.name, `${ingredient.volume} ${ingredient.volume_unit}`);
          }
        });

        return (
          <div key={index} className={`ai-recipe${index + 1}`}>
            <p>{recipe.name}</p>
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
              {recipe.needed_ingredients.map((ingredient, idx) => (
                <li key={idx}>
                  {ingredient.name}: {ingredient.volume} {ingredient.volume_unit}
                </li>
              ))}
            </ul>

            <h3>조리 방법</h3>
            <p>{recipe.instructions}</p>
             <button onClick={() => handelOnClick(recipe.instructions, allIngredientsMap,recipe.name)}>이 레시피로 글 등록</button>
          </div>
        );
      })}
    </div>
  );

};

export default CookingAI;