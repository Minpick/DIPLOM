import React from 'react'
import logo from '../../images/logo-white.png'
import style from './Sidebar.module.scss'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="logo" className="sidebar__logo" />

      <button className={style.sidebar__btn} >Клиенты</button>
      <button className={style.sidebar__btn} >Сотрудники</button>
      <button className={style.sidebar__btn}>Задачи</button>
      <button className={style.sidebar__btn}>Сделки</button>
    </div>
  )
}

export default Sidebar