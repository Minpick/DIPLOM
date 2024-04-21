import React from 'react'
import logo from '../../../LaPage/images/logo-black.png'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'
import classNames from 'classnames'

const Header = () => {
   const year = new Date().getFullYear()
   const month = new Date().getMonth()+1
   return (
      <div className={style.header}>
         <div className={style.container}>
            <NavLink
            to='progress'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Ход дела</NavLink>
            <NavLink
            to='chat'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Чат с юристом</NavLink>
            <NavLink
            to='biddings'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Торги</NavLink>
            <Link className={style.logo} to='/'><img src={logo} /></Link>
            <NavLink
            to='profile'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Профиль</NavLink>
            <NavLink
            to={`calendar?year=${year}&month=${month}`}
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Календарь</NavLink>
            <NavLink
            to='payment'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Оплата</NavLink>
         </div>

      </div>

   )
}

export default Header