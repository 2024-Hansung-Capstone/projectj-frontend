import React, { useState } from 'react';
import { MdMoreVert } from "react-icons/md";
import './css/Comment_Item.css';
import { gql, useMutation } from '@apollo/client';

const INCREASE_REPLY_LIKE = gql`
  mutation IncreaseReplyLike($reply_id: String!) {
    increaseReplyLike(reply_id: $reply_id) {
      id
    }
  }
`;

const DECREASE_REPLY_LIKE = gql`
  mutation DecreaseReplyLike($reply_id: String!) {
    decreaseReplyLike(reply_id: $reply_id){
      id
    } 
  }
`;
const DELETE_COMMENT_REPLY = gql`
  mutation DeleteCommentReply($commentReplyId: String!) {
    deleteCommentReply(commentReply_id: $commentReplyId) {
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
`;

export default function CommentToComment_Item({CommentToComent, onDeleteSuccess }) {

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(CommentToComent.like);
  //댓글 좋아요,좋아요취소 기능
  const [increaseReplyLike] = useMutation(INCREASE_REPLY_LIKE, {
    context: {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    },
    onCompleted: (data) => {
      setLikeCount();
      setLiked(!liked);
    },
    onError: (error) => {
      alert('댓글 좋아요 중 오류가 발생했습니다.'+error);
      console.log(CommentToComent);
      console.log(JSON.stringify(error, null, 2))
    }
  });

  const [decreaseReplyLike] = useMutation(DECREASE_REPLY_LIKE, {
    onCompleted: () => {
      setLikeCount();
      setLiked(!liked);
    },
  });

  const [deleteCommentReply, { loading, error }] = useMutation(DELETE_COMMENT_REPLY, {
    onCompleted: (data) => {
      console.log('대댓글 삭제 성공:', data);
      if (onDeleteSuccess) {
        onDeleteSuccess(CommentToComent.id);
      }
    },
    onError: (error) => {
      console.error('대댓글 삭제 중 오류 발생:', error);
      alert('대댓글 삭제 중 오류가 발생했습니다: ' + error.message);
      console.log(JSON.stringify(error, null, 2))
    }
  });

  const handleDelete = () => {
    deleteCommentReply({ variables: { commentReplyId: CommentToComent.id } });
  };
  
  const handleLikeClick = () => {
        if (liked) {
          decreaseReplyLike({ variables: { reply_id: CommentToComent.id } });
        } else {
          increaseReplyLike({ variables: { reply_id: CommentToComent.id } });
        }}
    return (
        <div className='commentTocomment-container'>
          <div className='comment-photo'>
            <p>사진</p>
          </div>
          <div className='commentTocomment-title'>
            <div className='commentTocomment-container1'>
              <div className='commentTocomment-name'>
                <p>{CommentToComent.user.name}</p>
              </div>
            </div>
            <div>
              {CommentToComent.detail}<button onClick={handleDelete} >삭제</button>
            </div>
            <div className='commentTocomment-container2'>
              <div className='commentTocomment-like'>
              <button onClick={handleLikeClick} className='like-button'>
              {liked ? '좋아요 취소' : '좋아요'}
              </button>
              <h6>{likeCount}</h6>
              </div>
            </div>
          </div>
        </div>
      );
}