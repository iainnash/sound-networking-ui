import React from 'react';

const KeyboardManager = ({sendMessage}) => {
    const sendMessageLocal = () => {
        sendMessage("test message!!!");
    };
    return (
        <button onClick={sendMessageLocal}>Send message</button>
    );
}

export default KeyboardManager;