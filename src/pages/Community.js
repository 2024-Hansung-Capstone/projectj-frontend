import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUtensils } from 'react-icons/fa';
import { FcHome, FcPaid, FcIdea, FcAdvertising, FcConferenceCall, FcFaq, FcShop } from "react-icons/fc";
import './css/Community.css';
import CommunityPost from './CommunityPost';
import Community_Item from '../item/Community_Item';

const Community = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const navigate = useNavigate();

  const boardListItems = [
    { title: '원룸 찾기', data: '원룸', icon: <FcHome /> },
    { title: '인테리어 정보', data: '인테리어 정보', icon: <FcIdea /> },
    { title: '맛집추천', data: '맛집추천', icon: <FcShop /> },
    { title: '요리자랑', data: '요리자랑', icon: <FaUtensils /> },
    { title: '메이트후기', data: '메이트후기', icon: <FcConferenceCall /> },
    { title: '고민상담', data: '고민상담', icon: <FcFaq /> },
  ];

  const handleListItemClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(boardListItems[index].data);
  };

  const handlePostButtonClick = () => {
    navigate('/CommunityPost');
  };

  return (
    <div className='community-container'>
      <div className='board-list'>
        <ul>
          {boardListItems.map((item, index) => (
            <li
              key={index}
              onClick={() => handleListItemClick(index)}
              className={selectedItem === index ? 'selected-item' : ''}
              >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className='community-scroll'>
        <div className='scroll-view'>
          {selectedItemData && <p>{selectedItemData}</p>}
          {/* 여기에 필요한 데이터를 표시하는 컴포넌트 추가 */}
          <Community_Item />
          <Community_Item />
          <Community_Item />
          <Community_Item />
        </div>
      </div>
      <button className='post-button' onClick={handlePostButtonClick}> 게시물 등록</button>
    </div>
  );
}

export default Community;