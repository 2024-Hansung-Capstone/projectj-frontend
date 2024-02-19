import React from 'react';
import CookingFilterBar from '../../components/CookingFilterBar';
import './Cooking.css';

const Cooking = () => {
  return (
    <div className='cooking-container'>
      <div className='filter-section'>
        <div className='filter-bar'>
          <CookingFilterBar />
        </div>
      </div>
      <div className='map-section'>
        <div className='header'>
          <h1>이달의 BEST 요리</h1>
        </div>
        <div className='best-dishes'>
          <img src='/path/to/image1.jpg' alt='dish1' />
          <img src='/path/to/image2.jpg' alt='dish2' />
          <img src='/path/to/image3.jpg' alt='dish3' />
        </div>
        <hr className='divider' />
        <div className='dishes-grid'>
          {[...Array(40)].map((_, index) => (
            <div key={index} className='dish-item'>
              <img src={`/path/to/image${index % 10}.jpg`} alt={`dish${index}`} />
              <p className='bold-title'>요리(글) 제목</p>
              <p>글쓴이</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cooking;