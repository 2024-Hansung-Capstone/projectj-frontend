import React, { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import './css/Comment_Item.css';
import { gql, useMutation, useQuery } from '@apollo/client';
import CommentToComment_Item from './CommentToComment_Item';

const DELETE_REPLY = gql`
  mutation DeleteReply($reply_id: String!) {
    deleteReply(reply_id: $reply_id) {
      id
      title
      detail
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
        comment_reply{
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
    }
  }
`;

const UPDATE_REPLY = gql`
  mutation UpdateReply($reply_id: String!, $detail: String!) {
    updateReply(reply_id: $reply_id, detail: $detail) {
      id
      detail
    }
  }
`;

const INCREASE_REPLY_LIKE = gql`
  mutation IncreaseReplyLike($reply_id: String!) {
    increaseReplyLike(reply_id: $reply_id) {
      id
    }
  }
`;

const DECREASE_REPLY_LIKE = gql`
  mutation DecreaseReplyLike($reply_id: String!) {
    decreaseReplyLike(reply_id: $reply_id) {
      id
    }
  }
`;

const CREATE_COMMENT_REPLY = gql`
  mutation CreateCommentReply($reply_id: String!, $detail: String!) {
    createCommetReply(reply_id: $reply_id, detail: $detail) {
      id
      detail
      user {
        name
        profile_image {
          imagePath
        }
      }
    }
  }
`;

const WHO_AM_I_QUERY = gql`
  query WhoAmI {
    whoAmI {
      id
      name
    }
  }
`;
export default function Comment_Item({ comment, isLiked,onDeleteSuccessToComment  }) {
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('token');
  const [editedDetail, setEditedDetail] = useState(comment.detail);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(comment.like);
  const [createCommentReply] = useMutation(CREATE_COMMENT_REPLY);
  const [newComment, setComment] = useState(comment);
  const [profileImage, setProfileImage] = useState(comment.user.profile_image?.imagePath); // 상태로 프로필 이미지 저장
  const { loading: whoAmILoading, error: whoAmIError, data: whoAmIData } = useQuery(WHO_AM_I_QUERY);
  const handleOptionsClick = () => {
    setShowOptions(!showOptions);
  };

  const [deleteReply] = useMutation(DELETE_REPLY, {
    variables: { reply_id: comment.id },
    onCompleted: () => {
      alert('댓글이 삭제되었습니다.');
      onDeleteSuccessToComment(comment.id);
    },
    onError: (error) => {
      console.error('댓글 삭제 중 오류 발생:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.' + error);
    }
  });

  const [updateReply] = useMutation(UPDATE_REPLY, {
    variables: { reply_id: comment.id, detail: editedDetail },
    onCompleted: () => {
      setIsEditing(false);
      alert('댓글이 수정되었습니다.');
    },
    onError: (error) => {
      console.error('댓글 수정 중 오류 발생:', error);
      alert('댓글 수정 중 오류가 발생했습니다.' + error);
    }
  });

  const [increaseReplyLike] = useMutation(INCREASE_REPLY_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token}` // Include the token in the authorization header
      }
    },
    onCompleted: (data) => {
      setLikeCount((prev) => prev + 1);
      setLiked(true);
    },
    onError: (error) => {
      console.error('댓글 좋아요 중 오류 발생:', error);
      alert('댓글 좋아요 중 오류가 발생했습니다.' + error);
    }
  });
  

  const [decreaseReplyLike] = useMutation(DECREASE_REPLY_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${token}` // Include the token in the authorization header
      }
    },
    onCompleted: () => {
      setLikeCount((prev) => prev - 1);
      setLiked(false);
    },
    onError: (error) => {
      console.error('댓글 좋아요 취소 중 오류 발생:', error);
      alert('댓글 좋아요 취소 중 오류가 발생했습니다.' + error);
      console.log(JSON.stringify(error, null, 2))

    }
  });

  const handleEditClick = () => {
    setIsEditing(true);
    setShowOptions(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      deleteReply();
    }
  };

  const handleLikeClick = () => {
    if (liked) {
      decreaseReplyLike({ variables: { reply_id: comment.id } });
    } else {
      increaseReplyLike({ variables: { reply_id: comment.id } });
    }
  };

  const handleSaveClick = () => {
    updateReply();
  };

  const handleReplyClick = async () => {
    const detail = prompt('대댓글 내용을 입력하세요.');
    if (detail) 
    {
      const { data } = await createCommentReply({ variables: { reply_id: comment.id, detail } });
      alert('대댓글이 작성되었습니다.');    
      if (newComment.comment_reply && newComment.comment_reply.length !== 0) {
        const updatedComment = {
          ...newComment,
          comment_reply: [...newComment.comment_reply, data.createCommetReply]
        };
        setComment(updatedComment);
      } else {
        // newComment.comment_reply가 존재하지 않거나 길이가 0인 경우에는 새로운 배열로 대댓글을 추가합니다.
        const updatedComment = {
          ...newComment,
          comment_reply: [data.createCommetReply]
        };
        setComment(updatedComment);
      }
    }
  };
  const handleDeleteSuccess = (deletedCommentId) => {
    const updatedComment = {
      ...comment,
      comment_reply: comment.comment_reply.filter(comment => comment.id !== deletedCommentId)
    };
    setComment(updatedComment);
  };
  return (
    <div className='comment-container0'>
      <div className='comment-photo'>
        {comment.user.profile_image && comment.user.profile_image.imagePath ? (
          <img className="comment-photo" src={comment.user.profile_image.imagePath} alt={comment.user.name} />
        ) : (
          <img className="comment-photo" src="assets/mate/user.jpeg" alt="user" />
        )}
        {/* 유저 사진 */}
      </div>
      <div className='comment-title'>
        <div className='comment-container1'>
          <div className='comment-name'>
            <p>{comment.user.name}</p> {/* 이름 */}
            <div className='comment-more' onClick={handleOptionsClick}>
            <MdMoreVert />
            {showOptions && (
              <div className='comment-options'>
                <button onClick={handleEditClick}>수정</button>
                <button onClick={handleDeleteClick}>삭제</button>
              </div>
            )}
          </div>
          </div>
          <div className='comment-container2'> 
          <div className='comment-post'> {/* 내용 */}
            {isEditing ? (
              <input
                type="text"
                value={editedDetail}
                onChange={(e) => setEditedDetail(e.target.value)}
              />
            ) : (
              <p>{editedDetail}</p>
            )}
          </div>
          <div className='comment-like'>
            <button onClick={handleLikeClick} className='like-button'>
              <img src={liked ? '/assets/community/heartFill.png' : '/assets/community/heartEmpty.png'} alt='like' />
            </button>
            <h6>{likeCount}</h6>
          </div>
          </div>
        </div>
        {isEditing && (
          <div className='comment-container2'>
            <button onClick={handleSaveClick}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        )}
        <div className='comment-container3'>
          <div className='comment-recomment'>
            <p onClick={handleReplyClick}>답글달기</p>
            {newComment.comment_reply && newComment.comment_reply.length > 0 && (
            <div className='commentTocomment-container'>
              {newComment.comment_reply.map((comment) => {
                console.log(comment);
                const isLiked = comment.like_user && comment.like_user.length > 0 && comment.like_user.some(like_user => like_user.user.id === whoAmIData?.whoAmI?.id);
              console.log(isLiked)
             return <CommentToComment_Item key={comment.id} CommentToComent={comment} onDeleteSuccess={handleDeleteSuccess} likedCTC={isLiked}/>
              })}
          </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
