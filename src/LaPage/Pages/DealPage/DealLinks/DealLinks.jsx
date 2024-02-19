import React from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'
import style from './DealLinks.module.scss'
import classNames from 'classnames'

const DealLinks = () => {
   const { deal } = useParams()
   return (
      <div
         className={style.wrapper}>

         <NavLink
            className={({ isActive}) =>
            isActive ? classNames(style.active,style.link) : style.link
         }
            to={`${deal}/progress`}
         >
            Ход дела
         </NavLink>
         <NavLink
            to={`${deal}/mail`}
            className={({ isActive}) =>
               isActive ? classNames(style.active,style.link) : style.link
            }
         >
            Почта
         </NavLink>
         <NavLink
            to={`${deal}/payment`}
            className={({ isActive}) =>
               isActive ? classNames(style.active,style.link) : style.link
            }
         >
            Оплата
         </NavLink>
      </div>
   )
}

export default DealLinks