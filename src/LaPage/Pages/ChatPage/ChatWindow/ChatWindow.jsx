import React from 'react'
import { useParams } from 'react-router'
import style from './ChatWindow.module.scss'

const ChatWindow = () => {
  const params = useParams()
  // console.log(id)
  return (
    <div className={style.page}>
      <div className={style.left}>
        <span>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero quo rerum maiores, soluta quidem nostrum fugiat esse nisi aliquid in.</span>
      </div>
      <div className={style.right}>
        <span>Hi</span>
      </div>
      <div className={style.right}>
        <span>How are you?</span>
      </div>
      <div className={style.inputWrapper}> <input className={style.input} />
        <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" stroke="#1b0060" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
  )
}

export default ChatWindow