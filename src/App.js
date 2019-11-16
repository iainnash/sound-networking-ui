import React, { Component, useEffect, useState, useCallback } from 'react';
import {motion, useAnimation} from 'framer-motion';
import {useDeviceMotion} from './hooks/useDeviceMotion';
import {useNetworkStatus} from './hooks/useNetworkStatus';
import QuietHelper from './QuietHelper';
import './App.css';



export default function App() {
  const list = useAnimation();
  useEffect(() => {
    list.start(i => ({
      opacity: 1,
      transition: {delay: i * 0.3}
    }))
  })
  const [messages, setMessages] = useState([]);
  const {isOnline, offlineAt} = useNetworkStatus();
  const {acceleration, lastShaken, rotationRate, interval} = useDeviceMotion();
  
  useEffect(() => {
    function messageSubscriber(message) {
      setMessages([...messages, ...message.split(' ')]);
    }
    QuietHelper.sharedInstance.subscribeToNewMessage(messageSubscriber);
    return function() {
      QuietHelper.sharedInstance.unsubscribeToNewMessage(messageSubscriber);
    };
  }, [messages]);
  
  const sendMessage = (evt) => {
    QuietHelper.sharedInstance.send("hello worlddds");
    evt.preventDefault();
  }
  
  return (
    <div className={lastShaken > new Date().getTime() - 1000 ? 'shaken' : ''}>
      <a onClick={sendMessage}>send message</a>
      <ul id="content">
        {messages.map((message, indx) => (
          <motion.li animate={list} drag={true} custom={indx+1} key={indx}>{message}</motion.li>
        ))}
      </ul>
      <h1>{isOnline ? "Online" : "Offline"}</h1>
      <pre>
        {JSON.stringify(2)}
      </pre>
    </div>
  );
}
