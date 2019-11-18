import React from 'react';

const MessageList = ({messages}) => (
    <div>
        {messages.map((message, indx) => (
            <li key={indx}>{message}</li>
        ))}
    </div>
);

export default MessageList;