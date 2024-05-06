import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import Community_Item from '../item/Community_Item';
import { BoardList_Item } from '../item/BoardList_Item'; 

const GET_BOARD = gql`
  query GetBoard {
    fetchBoards {
      category
      title
      detail
    }
  }
`;

const CREATE_BOARD = gql`
  mutation CreateBoard($category: String!, $title: String!, $detail: String!) {
    createBoardWithImage(createBoardInput: {
      category: $category,
      title: $title,
      detail: $detail,
    }) {
      category
      title
      detail
    }
  }
`;

const Community = () => {
  const { loading, error, data } = useQuery(GET_BOARD);
  const [createBoard] = useMutation(CREATE_BOARD); // 수정된 부분
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

  const handleCreateBoard = async () => {
    try {
      await createBoard({
        variables: {
          category: "원룸찾기",
          title: "새로운 게시물 제목",
          detail: "새로운 게시물 내용",
        },
        refetchQueries: [{ query: GET_BOARD }],
      });
    } catch (error) {
      console.error('Error creating board:', error);
    }
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
      <button className='post-button' onClick={handleCreateBoard}>게시물 생성</button>
    </div>
  );
}

export default Community;
