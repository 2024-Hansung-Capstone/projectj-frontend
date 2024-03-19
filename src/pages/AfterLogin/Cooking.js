import React, { useState } from 'react';
import CookingFilterBar from '../../components/CookingFilterBar';
import Cooking_Item from '../../item/Cooking_Item';
import './css/Cooking.css';

const Cooking = () => {
  const [isFilterBarOpen, setFilterBarOpen] = useState(true);

  const toggleFilterBar = () => {
    setFilterBarOpen(!isFilterBarOpen);
  };

  return (
    <div className='cooking-container'>
      {/* Toggle Button */}
      <div className={`toggle-button ${isFilterBarOpen ? 'open' : 'closed'}`} onClick={toggleFilterBar}>
        {isFilterBarOpen ? (
          <span>&lt;&lt;</span>
        ) : (
          <span>&gt;&gt;</span>
        )}
      </div>
      {/* Filter Section */}
      {isFilterBarOpen && (
        <div className='filter-section'>
          <div className='filter-bar'>
            <CookingFilterBar />
          </div>
        </div>
      )}
      {/* Map Section */}
      <div className='map-section'>
        <div className='header'>
          <h1>이달의 BEST 요리</h1>
        </div>
        <div className='best-dishes'>
          <Cooking_Item dishImage='/path/to/image1.jpg' dishTitle='요리(글) 제목1' author='글쓴이1' />
          <Cooking_Item dishImage='/path/to/image2.jpg' dishTitle='요리(글) 제목2' author='글쓴이2' />
          <Cooking_Item dishImage='/path/to/image3.jpg' dishTitle='요리(글) 제목3' author='글쓴이3' />
        </div>
        <hr className='divider' />
        <div className='dishes-grid'>
          {[...Array(40)].map((_, index) => (
            <div key={index} className='dish-item'>
              <Cooking_Item dishImage={`/path/to/image${index % 10}.jpg`} dishTitle={`요리(글) 제목${index}`} author={`글쓴이${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cooking;
