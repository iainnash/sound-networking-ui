import React, { useEffect, useState, useCallback } from 'react';
import SetupSplash from './SetupSplash';
import MessageList from './MessageList';
import KeyboardManager from './KeyboardManager';
import QuietHelper from './QuietHelper';
import './App.css';

const sendMessage = (message) => {
  QuietHelper.sharedInstance.transmit(message);
}

export default function App() {
  const [hasSetup, setHasSetup] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function messageSubscriber(message) {
      setMessages([...messages, ...message.split(' ')]);
    }
    QuietHelper.sharedInstance.subscribeToNewMessage(messageSubscriber);
    return () => {
      QuietHelper.sharedInstance.unsubscribeToNewMessage(messageSubscriber);
    };
  }, [messages]);

  const onSetup = useCallback(() => {
    QuietHelper.sharedInstance.setup();
    setHasSetup(true);
  }, [hasSetup]);
  
  return (
    <div>
      {!hasSetup && (
        <SetupSplash onSetup={onSetup} />
      )}
      {hasSetup && (
        <React.Fragment>
          <MessageList messages={messages} />
          <KeyboardManager sendMessage={sendMessage} />
        </React.Fragment>
      )}
    </div>
  );
}
