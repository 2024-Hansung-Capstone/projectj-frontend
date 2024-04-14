// CommunityPost.js
import React, { useState } from 'react';
import './css/CommunityPost.css';
import { FaCamera } from "react-icons/fa";
import { useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { BoardList_Item } from '../item/BoardList_Item'; 

const CREATE_BOARD = gql`
  mutation CreateBoard($createBoardInput: CreateBoardInput!) {
    createBoard(createBoardInput: $createBoardInput) {
      id
      category
      title
      detail
      view
      like
      createat
    }
  }
`;

const CommunityPost = ({ onPost }) => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [detail, setDetail] = useState('');
  const [userId, setUserId] = useState('');
  const [category, setCategory] = useState(''); 
  const [createBoard] = useMutation(CREATE_BOARD);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(URL.createObjectURL(selectedImage));
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await createBoard({
        variables: {
          createBoardInput: {
            title,
            detail,
            userId,
            category,
          },
        },
      });
  
      console.log('게시되었습니다:', data.createBoard);
      onPost(data.createBoard); // 게시된 데이터 전달
      navigate('/Community'); // 페이지 이동
  
    } catch (error) {
      console.error('Error creating board:', error);
    }
  };

  

  return (
    <div className="community-post-container">
      <h2>게시물 등록하기</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="community-post-category">카테고리</label>
          <select id="category" value={category} onChange={handleCategoryChange} required className="community-post-category-select">
            <option value="">카테고리를 선택하세요.</option>
            {BoardList_Item.map(item => (
              <option key={item.title} value={item.data}>{item.title}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="userId" className="community-post-userId">작성자</label>
          <input type="text" id="userId" value={userId} onChange={handleUserIdChange}/>
        </div>
        <div className="form-group">
          <label htmlFor="title" className="community-post-title">제목</label>
          <input type="text" className='community-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
        </div>
        <div className="form-group">
          <label htmlFor="mainImage" className="community-post-photo"><FaCamera /> 사진 첨부 </label>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
          {mainImage && <img src={mainImage} alt="Main Preview" className="community-main-image-preview" />}
        </div>
        <div className="form-group">
          <label htmlFor="detail" className="community-post-detail">내용</label>
          <textarea id="detail" value={detail} onChange={handleDetailChange} required placeholder="내용을 작성하세요." />
        </div>
        <button type="submit" onClick={handleSubmit} className="community-post-button">작성 완료</button>
      </form>
    </div>
  );
};

export default CommunityPost;
