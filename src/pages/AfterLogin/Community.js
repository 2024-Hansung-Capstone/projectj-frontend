import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa';
import { FcHome, FcPaid, FcIdea, FcAdvertising, FcConferenceCall, FcFaq, FcShop } from "react-icons/fc";
import './css/Community.css';
import Community_Item from '../../item/Community_Item';

export default function Community() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  const boardListItems = [
    { title: '원룸 찾기', data: '원룸', icon: <FcHome /> },
    { title: '인테리어 정보', data: '인테리어 정보', icon: <FcIdea /> },
    { title: '중고마켓', data: '중고마켓', icon: <FcPaid /> },
    { title: '맛집추천', data: '맛집추천', icon: <FcShop /> },
    { title: '요리자랑', data: '요리자랑', icon: <FaUtensils /> },
    { title: '메이트후기', data: '메이트후기', icon: <FcConferenceCall /> },
    { title: '고민상담', data: '고민상담', icon: <FcFaq /> },
    { title: '공지사항', data: '공지사항', icon: <FcAdvertising /> },
  ];

  const handleListItemClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(boardListItems[index].data);
  };

  return (
    <div className='community-container-wrapper'>
      <div className='community-container'>
        <div className='community-addpost'>
          <button onClick={() => console.log("글쓰기 버튼 클릭됨")}>글쓰기</button>
        </div>
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
        <div className='community-addPost'>
          <div className='community-addPost-button'>
            <button>글작성</button>
          </div>
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
      </div>
    </div>
  );
}
