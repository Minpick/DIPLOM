import React from 'react'
import { useParams } from 'react-router'
import style from './ChatWindow.module.scss'

const ChatWindow = () => {
   const params = useParams()
   // console.log(id)
  return (
    <div className={style.page}>{params.id}</div>
  )
}

export default ChatWindow