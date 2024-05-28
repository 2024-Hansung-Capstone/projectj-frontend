import React, { useState, useEffect } from 'react';
import './css/Community.css';
import { Input } from 'antd';
import { useQuery, useMutation } from '@apollo/client';
import { FaFire, FaBars } from "react-icons/fa";
import { gql } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import Community_Item from '../../item/Community_Item';
import { BoardList_Item } from '../../item/BoardList_Item';
import { WHO_AM_I_QUERY } from '../../item/Community_Item';
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
        profile_image{
          imagePath
        }
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
      title
      detail
      category
      view
      user {
        id
        name
        profile_image{
          imagePath
        }
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

const Community = () => {
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedItemData, setSelectedItemData] = useState(BoardList_Item[0]?.title);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { loading:errorLoading, error:errorWho, data:dataWho } = useQuery(WHO_AM_I_QUERY);
  const [loggedInUserName, setLoggedInUserName] = useState('');
  const { Search } = Input;
  const [searchInput, setSearchInput] = useState({
    title: '',
    detail: '',
  });
  const [isBoardListVisible, setIsBoardListVisible] = useState(false);

  const location = useLocation();
  const initialSelectedItem = location.state?.selectedItem || 0;

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

  useEffect(() => {
    console.log(initialSelectedItem);
    setSelectedItem(initialSelectedItem);
    setSelectedItemData(BoardList_Item[initialSelectedItem]?.title);
    toprefetch();
    refetch();
  }, [location.pathname, initialSelectedItem, toprefetch, refetch]);

  useEffect(() => {
    if (searchInput.title || searchInput.detail) {
      searchrefetch();
    }
  }, [searchInput, searchrefetch]);

  const handleCategoryClick = (index) => {
    setSelectedItem(index);
    setSelectedItemData(BoardList_Item[index]?.title);
    toprefetch();
    refetch();
  };

  const handleListItemClick = (board,isLiked) => {
    increaseView({ variables: { board_id: board.id } })
      .then((response) => {
        console.log('조회수가 증가되었습니다.', response.data);
      })
      .catch((err) => {
        console.error('조회수 증가 에러:', err);
      });
    navigate('/CommunityDetail', { state: { board, loggedInUserName, selectedItem,isLiked  } });
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
    console.log(JSON.stringify(searcherror, null, 2));
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

    return boards.map((board) => {
      var isLiked=null;
      isLiked = board.like_user.some(like_user => like_user.user.id === dataWho.whoAmI.id);
     
      return (
        <Community_Item
          key={board.id}
          board={board}
          selectedItem={selectedItem}
          onClick={() => handleListItemClick(board,isLiked)}
          isLiked={isLiked} // isLiked 값을 Community_Item에 prop으로 전달
        />
      );
    });
  };

  const toggleBoardListVisibility = () => {
    setIsBoardListVisible(!isBoardListVisible);
  };

  const handleHotBoardClick = (boardId) => {
    navigate('/CommunityDetail', { state: { boardId } });
  };

  return (
    <div className='community-container'>
      <div className={`board-list ${isBoardListVisible ? 'visible' : ''}`}>
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
        <div className='filter-bar-container'>
          <div className="menu-container"
            onMouseEnter={() => setIsBoardListVisible(true)} // 마우스를 올렸을 때 보이도록 설정
            onMouseLeave={() => setIsBoardListVisible(false)} // 마우스를 뗐을 때 안 보이도록 설정
          >
          <button onClick={toggleBoardListVisibility}>
            <img src='/assets/Community/menu.png' alt='menu'/>
        </button>
        <div className={`board-list ${isBoardListVisible ? 'visible' : ''}`}>
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
  </div>
  <Input.Group className='input-group'>
  <input
    type="text"
    name="title"
    placeholder="제목을 검색하세요."
    value={searchInput.title}
    onChange={handleChange}
  />
  <input
    type="text"
    name="detail"
    placeholder="내용을 검색하세요."
    value={searchInput.detail}
    onChange={handleChange}
  />
</Input.Group>

        </div>
        <div className='scroll-view'>
          {topdata && topdata.fetchBoardsByViewRank.map((board) => (
            <div className='community-hot-board' key={board.id}>
              <div className='community-hot-context'>
                <FaFire style={{ color: '#b22b29', marginBottom:'5px'}} />
                <div className='community-hot-title'>
                  <p>{board.title}</p>
                </div>
                <div className='community-hot-view'>
                  <img src="/assets/community/view.png" alt="view" />
                  <p>{board.view}</p>
                </div>
              </div>
            </div>
          ))}
          {selectedItem !== null && renderBoardList()}
        </div>
      </div>
      <button className='post-button2' onClick={handlePostButtonClick}> 게시글 등록</button>
    </div>
  );
};

export default Community;