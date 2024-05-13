import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Mate_Item.css';

export default function Mate_Item({ user }) {
    const navigate = useNavigate();

    if (!user) {
        return <p>Loading user data...</p>;
    }
    const userId = user.id ? user.id : 'Unknown User';
    const userName = user.name ? user.name : 'Unknown User';
    const gender = user.gender ? user.gender : 'Unknown Gender';
    const mbti = user.mbti ? user.mbti : 'Unknown mbti';
    const birthYear = user.birth_at ? new Date(user.birth_at).getFullYear() : 'Unknown Year';
    const currentYear = new Date().getFullYear();
    const userAge = user.birth_at ? `${currentYear - birthYear} 세` : 'Age unknown';

    const handleSendMessage = () => {
        navigate('../MessageCompose', { state: { writingId: userName, category: "mate" } });
    };

    return (
        <div className='mi-container'>
            <div className='mi-photo'> 
                <img className="user-image" src="/user.jpeg" alt="user"/>
            </div>
            
            <div className='mi-name'>
                <h4>{userName}</h4>
            </div>
            <div className='mi-container2'>
                <div className='mi-age'>
                    <h4>{userAge}</h4>
                </div>
                <div className='mi-gender'>
                    <h4>{gender}</h4>
                </div>
            </div>
            <div className='mi-mbti'>
                <h4>{mbti}</h4>
            </div>
            <div className='mi-btn'>
                <button onClick={handleSendMessage}>쪽지보내기</button>
            </div>
        </div>
    );
}
