import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './css/CookingAI.css';

// AI 검색 결과 가져오기
const FETCH_RECIPES = gql`
  query FetchRecipes($ingredients: [String!]!) {
    fetchRecipes(ingredients: $ingredients) {
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
  const { ingredients } = location.state || { ingredients: [] };
  const { loading, error, data } = useQuery(FETCH_RECIPES, {
    variables: { ingredients },
  });

  if (loading) return <p>레시피를 불러오는 중...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className='ai-container'>
      {data.fetchRecipes.map((recipe, index) => (
        <div key={index} className={`ai-recipe${index + 1}`}>
          <p>{recipe.name}</p>
          {/* 나머지 레시피 정보 출력 */}
        </div>
      ))}
    </div>
  );
};

export default CookingAI;