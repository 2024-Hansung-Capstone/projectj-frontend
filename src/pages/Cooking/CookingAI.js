import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/CookingAI.css';

const CookingAI = () => {
  return (
    <div className='ai-container'>
        <div className='ai-recipe1'>
            <p>레시피1</p>
        </div>
        <div className='ai-recipe2'>
          <p>레시피2</p>
        </div>
        <div className='ai-recipe3'>
          <p>레시피3</p>
        </div>
    </div>
  );
};

export default CookingAI;
