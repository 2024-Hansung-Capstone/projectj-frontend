import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { useQuery, useMutation } from '@apollo/client'; 
import { gql } from '@apollo/client';
import { useNavigate,useLocation } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';
import { BoardList_Item } from '../../item/BoardList_Item'; 
const GET_BOARD = gql`
query GetBoard($category: String!) {
  fetchBoards(category: $category) {
    id
    title
    detail
    category
    view
    user {
      id
      name
    }
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
// 조회수
const INCREASE_Board_VIEW = gql`
  mutation IncreaseBoardView($board_id: String!) {
    increaseBoardView(board_id: $board_id) {
      id
      view
    }
  }
`;

const Community = () => {
  //GET_BOARD는 카테고리를 지정해야 함 카테고리는 selectedItem에서 받아옴
  const { loading, error, data, refetch } =useQuery(GET_BOARD, {
    variables: { category: category }, // 카테고리 값은 적절히 변경해야 합니다.
  }) 
  //selectedItem이 null일 때 보여지는 컴포넌트가 필요해 보임
  const category = selectedItem !== null ? BoardList_Item[selectedItem]?.category : 'default_category';
  
  
  
  const [createBoard] = useMutation(CREATE_BOARD); 
  const navigate = useNavigate();
  const [increaseView] = useMutation(INCREASE_Board_VIEW);
  // initialSelectedItem이거는 CommunityDeatil에서 온 Board_List 인덱스임
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const [selectedItemData, setSelectedItemData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 현재 로그인 유무

  const location = useLocation();
  const initialSelectedItem = location.state?.selectedItem || null;
  useEffect(() => {
    if (data && data.fetchBoards && data.fetchBoards.length > 0) {
      setSelectedItemData(data.fetchBoards[0]?.title);
    }
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // 현재 로그인 유저 확인
    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, [data]);

  //selectedItem이 바뀔시 실행되는 GET_BOARD임
  useEffect(() => {
    if (selectedItem !== null) {
      refetch({ category: BoardList_Item[selectedItem]?.category });
    }
  }, [selectedItem, refetch]);


  //BoardList에 해당되는 category로 이동
  const handleCategoryClick =(index)=>{
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index].title);
  }

  //  클릭 시 조회수 증가 및 상세보기
  const handleListItemClick =(board) => {
    increaseView({ variables: { board_id: board.id }})
      .then(response => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('조회수 증가 에러:', err);
      });
      navigate('/CommunitDetail', { state: { board, loggedInUserName,selectedItem} });
  };
  //게시글 등록하기
  const handlePostButtonClick = () => {
    navigate('/CommunityPost', { state: { isLoggedIn, loggedInUserName,useLocation} });
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
              onClick={() => handleCategoryClick(index)}
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
                <Community_Item key={board.id} board={board} onClick={() => handleListItemClick(board)}  />
              ))
            ) : (
              <p>No boards available</p>
            )
          )}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 게시물 등록</button>
   
    </div>
  );
}

export default Community;
