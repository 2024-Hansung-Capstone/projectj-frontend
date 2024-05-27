import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import './css/CommunityUpdate.css'; // CommunityUpdate.css 파일 임포트

// GraphQL mutation for updating a board
const UPDATE_BOARD = gql`
  mutation UpdateBoard($updateBoradInput: UpdateBoardInput!) {
    updateBoard(updateBoradInput: $updateBoradInput) {
      id
      category
      title
      detail
      post_images {
        id
        imagePath
      }
    }
  }
`;

const CommunityUpdate = () => {
    const location = useLocation();
    const [board, setBoard] = useState(location.state?.board);
    const [formState, setFormState] = useState({
        id: board.id,
        category: board.category || '',
        title: board.title || '',
        detail: board.detail || '',
        post_images: []
    });
    const navigate = useNavigate();
    const [updateBoard] = useMutation(UPDATE_BOARD, {
        onCompleted: (data) => {
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate('/Community')
        },
        onError: (error) => {
            console.error('게시글 수정 중 오류 발생:', error);
            console.log(JSON.stringify(error, null, 2));
            alert('게시글 수정 중 오류가 발생했습니다.');
        }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormState({
            ...formState,
            post_images: e.target.files
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateBoard({
                variables: {
                    updateBoradInput: {
                        ...formState,
                        post_images: Array.from(formState.post_images)
                    }
                }
            });
        } catch (error) {
            console.error('게시글 수정 중 오류 발생:', error);
            alert('게시글 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container"> {/* container 클래스 추가 */}
            <h2>게시글 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>카테고리:</label>
                    <input
                        type="cu-text"
                        name="category"
                        value={formState.category}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>제목:</label>
                    <input
                        type="cu-text"
                        name="title"
                        value={formState.title}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>내용:</label>
                    <textarea
                        name="detail"
                        value={formState.detail}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>이미지 업로드:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>
                <button type="cu-submit">수정</button>
            </form>
        </div>
    );
};

export default CommunityUpdate;
