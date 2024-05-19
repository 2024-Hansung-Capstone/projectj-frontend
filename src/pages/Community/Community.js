import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { Checkbox, Slider, Input, Button } from 'antd';
import { useQuery, useMutation } from '@apollo/client'; 
import { FaFire } from "react-icons/fa6";
import { gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';
import { BoardList_Item } from '../../item/BoardList_Item'; 

// 게시물 가져오기
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
    like
    create_at
    reply {
      id
      detail
      
    }
    post_images {
      id
      imagePath
    }
  }
}
`;



// 조회수 증가
const INCREASE_BOARD_VIEW = gql`
  mutation IncreaseBoardView($board_id: String!) {
    increaseBoardView(board_id: $board_id) {
      id
      view
    }
  }
`;

const FETCH_BOARDS_BY_VIEW_RANK = gql`
  query FetchBoardsByViewRank($category: String!, $rank: Float!) {
    fetchBoardsByViewRank(category: $category, rank: $rank) {
      id
      category
      title
      detail
      view
    }
  }
`;
const FETCH_BOARDS_BY_SEARCH = gql`
  query FetchBoardsBySearch($searchBoardInput: SearchBoardInput!) {
    fetchBoardsBySerach(SerachBoardInput: $searchBoardInput) {
      id
      category
      title
      detail
    }
  }
`;
const Community = () => {
  const [selectedItem, setSelectedItem] = useState(null);//인덱스
  const [selectedItemData, setSelectedItemData] = useState(null); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 유무 확인
  const [loggedInUserName, setLoggedInUserName] = useState('');  // 로그인 유저 이름 
  const { Search } = Input; // 검색
  const [searchInput, setSearchInput] = useState({
    title: '',
    detail: '',
  });
  //삭제랑 게시글 추가시 전달되는 selecteItem
  const location = useLocation();
  const initialSelectedItem = location.state?.selectedItem || null;

  const { loading, error, data,refetch } = useQuery(GET_BOARD, {
    variables: { category: selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category' },
  });
  const { loading:toploading, error:toperror, data :topdata,refetch:toprefetch } = useQuery(FETCH_BOARDS_BY_VIEW_RANK, {
    variables: { category: selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category', rank:1.0 },
  });
  const { loading:searchloading, error:searcherror, data:searchdata,refetch:searchrefetch } = useQuery(FETCH_BOARDS_BY_SEARCH, {
    variables: { searchBoardInput: {
      category:selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category',
      title: searchInput.title,
      detail: searchInput.detail
    } },
  });


  const navigate = useNavigate();
  const [increaseView] = useMutation(INCREASE_BOARD_VIEW);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    const loggedInUser = localStorage.getItem('loggedInUserName');
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, [data]);

  useEffect(() => {
    if (initialSelectedItem !== null) {
      setSelectedItem(initialSelectedItem);
      setSelectedItemData(BoardList_Item[initialSelectedItem]?.title);
      toprefetch();
      refetch();
    }
  }, [initialSelectedItem]);
  
  
  //검색에서 쓰이는 훅
  useEffect(() => {
    if (searchInput.title || searchInput.detail) {
      searchrefetch()
    }
  }, [searchInput, searchrefetch]);

  //카테고리로 변경
  const handleCategoryClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index]?.title);
    toprefetch();
    refetch();
  }

  const handleListItemClick = (board) => {
    increaseView({ variables: { board_id: board.id }})
      .then(response => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch(err => {
        console.error('조회수 증가 에러:', err);
      });
    navigate('/CommunityDetail', { state: { board, loggedInUserName, selectedItem } });
  };

  const handlePostButtonClick = () => {
    navigate('/CommunityPost', { state: { isLoggedIn, loggedInUserName, location } });
  };

  const handleChange = (e) => {
    const value = e.target.value.trim() === '' ? '' : e.target.value;
    setSearchInput({
      ...searchInput,
      [e.target.name]: value,
    });
  };

//
  const renderBoardList = () => {
    if (searchloading || loading) return <p>Loading...</p>;

    let boards;
    if (searchInput.title || searchInput.detail) {
      boards = searchdata?.fetchBoardsBySerach;
    } else {
      boards = data?.fetchBoards;
    }
    if (!boards || boards.length === 0) {
      return <p>No boards available</p>;
    }

    return boards.map((board) => (
      <div key={board.id} onClick={() => handleListItemClick(board)}>
        {board.title}
      </div>
    ));
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
      {/* 검색창 */}
      <div className='community-scroll'>
      <div className='filter-bar-container'>
        <Input.Group compact>
      
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchInput.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="detail"
          placeholder="Detail"
          value={searchInput.detail}
          onChange={handleChange}
        />
        </Input.Group>
      </div>

        {/* 게시물 컴포넌트 위치  */}
        <div className='scroll-view'>
          {/* 인기 게시물  */}
          {topdata&&topdata.fetchBoardsByViewRank.map((board) => (
          <div className='community-hot-board' key={board.id}>
            <FaFire style={{color: '#b22b29'}} />
            <div className='community-hot-context'>
              <p>내용</p>  <p>{board.detail}</p>
            </div>
            <div className='community-hot-view'>
              <p>조회수</p> <p>{board.view}</p>
            </div>
          </div>
           ))}

          {selectedItemData && <p>{selectedItemData}</p>}
          {selectedItem !== null && renderBoardList()}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 게시물 등록</button>
   
   
    </div>
  );
}

export default Community;
