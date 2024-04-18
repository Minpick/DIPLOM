import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import style from './ChatWindow.module.scss'
import { io } from 'socket.io-client'
import axios from 'axios'

const ChatWindow = () => {
  // const [messages, setMessages] = useState([]);
  // const [message, setMessage] = useState('');
  // const params = useParams()
  // useEffect(() => {
  //   // Получение сообщений при загрузке компонента
  //   axios.get('http://localhost:8085/chat/messages')
  //     .then(response => {
  //       setMessages(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching messages:', error);
  //     });

  //   // Подписка на новые сообщения через WebSocket
  //   socket.on('newMessage', newMessage => {
  //     setMessages([...messages, newMessage]);
  //   });

  //   // Отписка от событий при размонтировании компонента
  //   return () => {
  //     socket.off('newMessage');
  //   };
  // }, [messages]);
  // const sendMessage = () => {
  //   if (message.trim() !== '') {
  //     axios.post('http://localhost:8085/messages', { text: message })
  //       .then(response => {
  //         setMessage('');
  //       })
  //       .catch(error => {
  //         console.error('Error sending message:', error);
  //       });
  //   }
  // };
  // console.log(id)
  return (
    <div className={style.page}>
      {/* <div className={style.left}>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quo rerum maiores, soluta quidem nostrum fugiat esse nisi aliquid in.</span>
      </div>
      <div className={style.right}>
        <span>Hi</span>
      </div>
      <div className={style.right}>
        <span>How are you?</span>
      </div> */}
      {messages.map((msg, index) => (
        <div key={index}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
        {/* <button onClick={sendMessage}>Send</button> */}
      <div className={style.inputWrapper}> 
      {/* <input type="text" value={message} className={style.input} onChange={(e) => setMessage(e.target.value)} /> */}
      {/* <input className={style.input} /> */}
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        //  onClick={sendMessage}
         >
          <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" stroke="#1b0060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default ChatWindow