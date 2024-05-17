import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './css/CookingAI.css';

const CookingAI = () => {
  const location = useLocation();
  const { ingredients } = location.state || { ingredients: [] };
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      // AI API 호출 예시 (임의의 API를 사용하는 경우)
      fetch('https://api.example.com/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })
        .then((response) => response.json())
        .then((data) => setRecipes(data.recipes))
        .catch((error) => console.error('Error fetching recipes:', error));
    }
  }, [ingredients]);

  return (
    <div className='ai-container'>
      {recipes.length === 0 ? (
        <p>레시피를 불러오는 중...</p>
      ) : (
        <>
          {recipes.map((recipe, index) => (
            <div key={index} className={`ai-recipe${index + 1}`}>
              <p>{recipe}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default CookingAI;
