import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Mate_Item.css';

export default function Mate_Item() {
    const navigate = useNavigate();

    const handleSendMessage = () => {
        const isLoggedIn = true;

        if (isLoggedIn) {
            navigate('../pages/AfterLogin/message');
        } else {
            navigate('../pages/AfterLogin/login');
        }
    };

    return (
        <div className='mi-container'>
            <div className='mi-photo'> 
                <img className="user-image" src="/user.jpeg" alt="user"/>
            </div>
            <div className='mi-name'>
                <h4>이름</h4>
            </div>
            <div className='mi-age'>
                <h4>나이</h4>
            </div>
            <div className='mi-button'>
                <button>쪽지보내기</button>
            </div>
        </div>
      );
}
