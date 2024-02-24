import React from 'react';
import CookingFilterBar from '../../components/CookingFilterBar';
import Cooking_Item from '../../item/Cooking_Item';
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
