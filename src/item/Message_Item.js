import React from 'react';
import './css/Message_Item.css';

const Message_Item = ({ messagedata, onClick }) => {
  return (
    <div className="message-item" onClick={onClick}>
      <div className='message-item-sender'>
        <p>{messagedata.sender.name}</p>
      </div>
      <div className='message-item-category'>
        <p>{messagedata.category}</p>
      </div>
      <div className='message-item-title'>
        <p>{messagedata.title}</p>
      </div>
      <div className='message-item-detail'>
        <p>{messagedata.detail}</p>
      </div>
    </div>
  );
};

export default Message_Item;
