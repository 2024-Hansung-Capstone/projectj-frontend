import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { Input } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { FaFire } from "react-icons/fa6";
import { gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
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
      like
      create_at
      reply {
        id
        like
        detail
        user {
          id
          name
        }
        like_user {
          id
          user {
            id
            name
          }
        }
        comment_reply {
          id
          like
          detail
          user {
            id
            name
          }
          like_user {
            id
            user {
              id
              name
            }
          }
        }
      }
      post_images {
        id
        imagePath
      }
      like_user {
        id
        user {
          id
          name
        }
      }
    }
  }
`;

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
  const [selectedItem, setSelectedItem] = useState(0); // 초기값을 0으로 설정하여 룸메이트 카테고리가 선택되도록 함
  const [selectedItemData, setSelectedItemData] = useState(BoardList_Item[0]?.title); // 초기값을 룸메이트 카테고리로 설정
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 유무 확인
  const [loggedInUserName, setLoggedInUserName] = useState(''); // 로그인 유저 이름
  const { Search } = Input; // 검색
  const [searchInput, setSearchInput] = useState({
    title: '',
    detail: '',
  });

  const location = useLocation();
  const initialSelectedItem = location.state?.selectedItem || 0; // 초기값을 0으로 설정하여 룸메이트 카테고리가 선택되도록 함

  const { loading, error, data, refetch } = useQuery(GET_BOARD, {
    variables: { category: selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category' },
  });

  const { loading: toploading, error: toperror, data: topdata, refetch: toprefetch } = useQuery(FETCH_BOARDS_BY_VIEW_RANK, {
    variables: { category: selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category', rank: 1.0 },
  });

  const { loading: searchloading, error: searcherror, data: searchdata, refetch: searchrefetch } = useQuery(FETCH_BOARDS_BY_SEARCH, {
    variables: { searchBoardInput: {
      category: selectedItem !== null ? BoardList_Item[selectedItem]?.title : 'default_category',
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
    const loggedInUserId = localStorage.getItem('loggedInUserNameId');
    console.log(loggedInUser);
    console.log(loggedInUserId);
    if (loggedInUser) {
      setLoggedInUserName(loggedInUser);
    } else {
      setLoggedInUserName('');
    }
  }, [data]);

  // 삭제, 추가 후 GET_BOARD 실행
  useEffect(() => {
    console.log(initialSelectedItem);
    setSelectedItem(initialSelectedItem);
    setSelectedItemData(BoardList_Item[initialSelectedItem]?.title);
    toprefetch();
    refetch();
  }, [location.pathname, initialSelectedItem, toprefetch, refetch]);

  // 검색에서 쓰이는 훅
  useEffect(() => {
    if (searchInput.title || searchInput.detail) {
      searchrefetch();
    }
  }, [searchInput, searchrefetch]);

  // 카테고리로 변경
  const handleCategoryClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index]?.title);
    toprefetch();
    refetch();
  };

  
  const handleListItemClick = (board) => {
    increaseView({ variables: { board_id: board.id } })
      .then((response) => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch((err) => {
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

  const renderBoardList = () => {
    if (searchloading || loading) return <p>Loading...</p>;
    console.log(JSON.stringify(error, null, 2));
    let boards;
    if (searchInput.title || searchInput.detail) {
      boards = searchdata?.fetchBoardsBySerach;
      if (!boards || boards.length === 0) {
        return <p>검색 결과가 없습니다.</p>;
      }
    } else {
      boards = data?.fetchBoards;
      if (!boards || boards.length === 0) {
        return <p>No boards available</p>;
      }
    }
  
    return boards.map((board) => (
      <Community_Item
        key={board.id}
        board={board}
        selectedItem={selectedItem}
        onClick={() => handleListItemClick(board)} // Pass handleListItemClick as onClick prop
      />
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
        <div className='scroll-view'>
          {/* 클릭된 카테고리명 */}
          { /* <h2>{selectedItemData}</h2> */ } 
          {/* 인기 게시물 */}
          {topdata && topdata.fetchBoardsByViewRank.map((board) => (
            <div className='community-hot-board' key={board.id}>
              <FaFire style={{ color: '#b22b29'}} />
              <div className='community-hot-context'>
              <div className='community-hot-detail'>
                <p>{board.detail}</p>
              </div>
              <div className='community-hot-view'>
              <img src="/view.png" alt="view" />
                <p>{board.view}</p>
              </div>
            </div>
            </div>
          ))}

          {/* 선택된 카테고리의 게시물 리스트 보여주기 */}
          {selectedItem !== null && renderBoardList()}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 게시물 등록</button>
    </div>
  );
};

export default Community;
