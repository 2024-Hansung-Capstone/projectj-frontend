import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';
import { BoardList_Item } from '../../item/BoardList_Item'; 


// 게시물 가져오기
const GET_BOARD = gql`
  query GetBoard {
    fetchBoards {
      category
      title
      detail
    }
  }
`;

const Community = () => {
  const { loading, error, data } = useQuery(GET_BOARD);
  const navigate = useNavigate();  // 페이지 이동할 때는 useNavigate()를 사용합니다. 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [selectedItemData, setSelectedItemData] = useState(null);

  useEffect(() => {
    if (data && data.fetchBoards && data.fetchBoards.length > 0) {
      setSelectedItemData(data.fetchBoards[0]?.title);
    }
  }, [data]);

  // 카테고리 버튼 클릭
  const handleListItemClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index].title);
  };

  // 상품등록 버튼 클릭
  const handlePostButtonClick = () => {
    navigate('/CommunityPost');
  };

  return (  
    <div className='community-container'>
      {/* 카테고리 클릭 시 해당 카테고리 페이지 보여지도록 설정합니다.
      gql 아직 연결 안되어있어서 데이터 적용은 아직입니다. */}
      <div className='board-list'>
        <ul>
          {}
          {BoardList_Item.map((item, index) => (
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
          {/* 데이터 항목들이 Community_Item에 감싸져서 화면에 표시됩니다. */}
          {selectedItemData && <p>{selectedItemData}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data && data.fetchBoards ? (
              data.fetchBoards.map((board) => (  // Community_Item으로 전달하는 방식
                <Community_Item key={board.id} board={board} />
              ))
            ) : (
              <p>No boards available</p> // 데이터 없을 때
            )
          )}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 상품 등록</button>
    </div>
  );
}

export default Community;
