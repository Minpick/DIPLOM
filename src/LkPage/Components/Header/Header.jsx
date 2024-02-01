import React from 'react'
import logo from '../../../LaPage/images/logo-black.png'
import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.scss'
import classNames from 'classnames'

const Header = () => {
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
               disabled={({isActive})=>isActive}
            >Чат с юристом</NavLink>
            <Link className={style.logo} to='/'><img src={logo} /></Link>
            <NavLink
            to='docs'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Загрузка документов</NavLink>
            <NavLink
            to='payment'
               className={({ isActive }) => isActive ? classNames(style.active, style.link) : style.link}
            >Оплата</NavLink>
         </div>

      </div>

   )
}

export default Header