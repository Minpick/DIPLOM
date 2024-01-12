import React from 'react'
import logo from '../../images/logo-white.png'
import style from './Sidebar.module.scss'
import { NavLink } from 'react-router-dom'


const Sidebar = () => {
  const btn = style.sidebar__btn
  return (
    <div className="sidebar" id='sidebar'>
      <img src={logo} alt="logo" className="sidebar__logo" />
      <NavLink className={({ isActive }) => isActive ? style.active : style.btn} to='clients'>Клиенты</NavLink>
      <NavLink className={({ isActive }) => isActive ? style.active : style.btn} to='employee'>Сотрудники</NavLink>
      <NavLink className={({ isActive }) => isActive ? style.active : style.btn} to='tasks'>Задачи</NavLink>
      <NavLink className={({ isActive }) => isActive ? style.active : style.btn} to='deals'>Сделки</NavLink>
    </div>
  )
}

export default Sidebar