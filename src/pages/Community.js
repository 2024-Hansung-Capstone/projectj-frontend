import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Community_Item from '../item/Community_Item';
import { BoardList_Item } from '../item/BoardList_Item'; 

const GET_BOARDS = gql`
  query FetchBoards {
    fetchBoards(category: "") {
      id
      category
      title
      detail
      view
      like
      create_at
    }
  }
`;

const Community = () => {
  const { loading, error, data } = useQuery(GET_BOARDS);
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemData, setSelectedItemData] = useState(null);

  useEffect(() => {
    if (data && data.fetchBoards && data.fetchBoards.length > 0) {
      setSelectedItemData(data.fetchBoards[0]?.title);
    }
  }, [data]);

  const handleListItemClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index].title);
  };

  const handlePostButtonClick = () => {
    navigate('/CommunityPost');
  };

  return (
    <div className='community-container'>
      <div className='board-list'>
        <ul>
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
          {selectedItemData && <p>{selectedItemData}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            data && data.fetchBoards ? (
              data.fetchBoards.map((board) => (
                <Community_Item key={board.id} board={board} />
              ))
            ) : (
              <p>No boards available</p>
            )
          )}
        </div>
      </div>
      <button className='post-button' onClick={handlePostButtonClick}>게시물 등록</button>
    </div>
  );
}

export default Community;
