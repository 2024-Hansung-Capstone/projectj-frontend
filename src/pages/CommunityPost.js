import React, { useState } from 'react';
import './css/CommunityPost.css';
import { FaCamera } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const CommunityPost = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [images, setImages] = useState([{ text: '', preview: null }]);
  const [nextId, setNextId] = useState(1);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleMainImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setMainImage(URL.createObjectURL(selectedImage));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDetailChange = (e) => {
    setDetail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('게시되었습니다:', { title, mainImage, price, detail, images });
    onClose(); // 모달 닫기
  };

  const handleCancel = () => {
    onClose(); // 모달 닫기
    navigate('/CommunityPost');
  };


  return (
    <div className="modal">
      <div className="modal-content-community">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>게시물 작성하기</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="community-post-title">제목</label>
            <input type="text" className='community-post-input' id="title" value={title} onChange={handleTitleChange} required placeholder='제목'/>
          </div>
          <div className="form-group">
            <label htmlFor="mainImage" className="community-post-photo"><FaCamera />사진 첨부 </label>
            <input type="file" id="mainImage" accept="image/*" onChange={handleMainImageChange} required />
            {mainImage && <img src={mainImage} alt="Main Preview" className="market-main-image-preview" />}
          </div>
          <div className="form-group">
            <label htmlFor="detail" className="community-post-detail">내용</label>
            <textarea id="detail" value={detail} onChange={handleDetailChange} required placeholder="문구를 작성하세요." />
          </div>
          <div className="button-group">
            <button type="button" className="cancel-button" onClick={handleCancel}>취소</button>
            <button type="submit" className="button">게시하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommunityPost;
