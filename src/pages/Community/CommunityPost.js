import React, { useState } from 'react';
import './css/CommunityPost.css';
import { FaCamera } from "react-icons/fa";
import { useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate,useLocation } from 'react-router-dom';
import { BoardList_Item } from '../../item/BoardList_Item'; 

// CREATE_BOARD 뮤테이션 정의
const CREATE_BOARD = gql`
mutation CreateBoard($createBoardInput: CreateBoardInput!) {
  createBoard(createBoardInput: $createBoardInput) {
    id
    category
    title
    detail
    post_images {
      id
      imagePath
      
    }
  }
}
`;


const CommunityPost = ({ onPost }) => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState(''); 
  const location =useLocation();
  const { isLoggedIn,  loggedInUserName,selectedItem } = location.state || {};
  const navigate = useNavigate();
  const [createBoard] = useMutation(CREATE_BOARD, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token') || ''}`
      }
    }
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(selectedImage);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
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
            category,
            post_images: mainImage ? mainImage : []
          }
        }
      });

      console.log('게시되었습니다:', data.createBoard);
      navigate('/Community',{state:{selectedItem}}); // 페이지 이동 이동시 해당 카테고리로 이동하기 위해 selectedItem전달
  
    } catch (error) {
      if (error.message.includes('Unauthorized')) {
        // 인증되지 않았을 때의 처리
        alert('게시물을 등록할 수 있는 권한이 없습니다. 로그인 후 다시 시도해주세요.');
      } else {
        // 그 외의 오류 처리
        console.error('Error creating board:', error);
        alert('게시물을 등록하는 중 오류가 발생했습니다. 다시 시도해주세요.'+error);
      }
    }
  };
  

  return (
    <div className="community-post-container">
      <div className="community-post-header">
        <img src='/assets/community/write.png' alt='write' style={{width:'40px', height: '40px', marginRight:'5px'}}/>
        <h2>게시물 등록</h2>
      </div>
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
          <label htmlFor="title" className="community-post-title">제목</label>
          <input type="cooking_text" className='community-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
        </div>
        <div className="form-group">
          <label htmlFor="mainImage" className="community-post-photo"><FaCamera /> 사진 첨부 </label>
          <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
          {mainImage && <img src={URL.createObjectURL(mainImage)} alt="Main Preview" className="community-main-image-preview" />}
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
