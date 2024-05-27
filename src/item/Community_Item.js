import React, { useState, useEffect } from 'react';
import './css/Community_Item.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const DELETE_BOARD = gql`
  mutation DeleteBoard($board_id: String!) {
    deleteBoard(board_id: $board_id)
  }
`;

const INCREASE_BOARD_LIKE = gql`
  mutation IncreaseBoardLike($board_id: String!) {
    increaseBoardLike(board_id: $board_id) {
      id
      like
    }
  }
`;

const DECREASE_BOARD_LIKE = gql`
  mutation DecreaseBoardLike($board_id: String!) {
    decreaseBoardLike(board_id: $board_id) {
      id
      like
    }
  }
`;

export const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;

export default function Community_Item({ board, selectedItem, onClick,isLiked }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(board.like);
  const [deleteBoard] = useMutation(DELETE_BOARD, {
    variables: { board_id: board.id },
    onCompleted: () => {
      console.log(selectedItem);
      navigate('/Community', { state: { selectedItem } });
    },
    onError: (error) => {
      console.error('게시글 삭제 중 오류 발생:', error);
    },
  });
  const [increaseBoardLike] = useMutation(INCREASE_BOARD_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token || ''}`
      }
    },
    onCompleted: (data) => {
      setLikeCount(data.increaseBoardLike.like);
    },
  });

  const [decreaseBoardLike] = useMutation(DECREASE_BOARD_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token || ''}`
      }
    },
    onCompleted: (data) => {
      setLikeCount(data.decreaseBoardLike.like);
    },
  });

  const { loading: whoAmILoading, error: whoAmIError, data: whoAmIData } = useQuery(WHO_AM_I_QUERY);
  const whoAmI = whoAmIData?.whoAmI;

  useEffect(() => {
    if (whoAmI && board.user && whoAmI.id === board.user.id) {
      // 현재 로그인한 사용자와 게시글 작성자가 동일한 경우에만 수정 및 삭제 버튼을 표시
      // 해당 조건에 따라 렌더링하도록 조건 추가
    }
  }, [whoAmI, board.user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${month}/${day} ${hours}:${minutes}`;
  };

  const handleLikeClick = () => {
    if (liked) {
      decreaseBoardLike({ variables: { board_id: board.id } });
    } else {
      increaseBoardLike({ variables: { board_id: board.id } });
    }
    setLiked(!liked);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      deleteBoard();
    }
  };

  const handleUpdateClick = () => {
    console.log(board);
    navigate('/CommunityUpdate', { state: { board } });
  };

  return (
    <div className='communitydetail-container'>
      <div className='ci-container'  onClick={onClick}>
        <div className='ci-title'>
        <div className='ci-userPhoto'>
            {board.user.profile_image && board.user.profile_image.imagePath ? (
              <img className="ci-userImage" src={board.user.profile_image.imagePath} alt={board.user.name} />
            ) : (
              <img className="ci-userImage" src="assets/mate/user.jpeg" alt="user" />
            )}
            {/* 유저 사진 */}
          </div>
          <div className='ci-userName'>
            <h4>{board.user.name}</h4>
          </div>
          <div className='ci-date'>
            <h4>{formatDate(board.create_at)} </h4>
          </div>
          <div className='ci-buttons'>
            {whoAmI && board.user && whoAmI.id === board.user.id && (
              // 현재 로그인한 사용자와 게시글 작성자가 동일한 경우에만 수정 및 삭제 버튼을 표시
              <>
                <button onClick={handleDelete} className='delete-button'>삭제</button>
                <button onClick={handleUpdateClick} className='update-button'>수정</button>
              </>
            )}
          </div>
        </div>

        {board?.post_images?.length > 0 && (
          <div className='ci-container2'>
            <div className='ci-post'>
              <div className="community-images-container">
                {board.post_images.map((image, index) => (
                  <img key={index} src={image.imagePath} alt={`이미지 ${index + 1}`} className="community-main-image" />
                ))}
              </div>
            </div>
            <div className='ci-text'>
              <h4>{board.detail}</h4>
            </div>
          </div>
        )}

        {board?.post_images?.length === 0 && (
          <div className='ci-container2'>
            <div className='ci-text'>
              <p>{board.detail}</p>
            </div>
          </div>
        )}

        <div className='ci-like'>
          <button onClick={handleLikeClick} className='like-button'>
            <img src={liked ? '/assets/community/heartFill.png' : '/assets/community/heartEmpty.png'} alt='like' />
          </button>
          <h5>{likeCount}</h5>
        </div>
      </div>
    </div>
  );
}
