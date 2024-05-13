// MessageItem.js
import React from 'react';

export default function Message_Item({ messagedata }) {
  return (
    <div className="MessageItem">
      <div className="MessageTitle">{messagedata.title}</div>
      <div className="MessageSender">{messagedata.sender}</div>
      <div className="MessageCategory">{messagedata.category}</div>
    </div>
  );
}
