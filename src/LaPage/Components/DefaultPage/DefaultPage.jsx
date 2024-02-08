import React from 'react'
import style from './DefaultPage.module.scss'
import { NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import ParamsBtns from '../../UI/ParamsBtns/ParamsBtns'

const DefaultPage = ({ li, children, statuses,addLi }) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const status = searchParams.get('status')
   if (status === 'produce') {
      li[1] = 'Исполнитель'
   } else {
      li[1] = addLi
   }
   const menu = li.map((item) => {
      return (
         <li key={item} className={style.page__navbar_item}>{item}</li>
      )
   })
   return (
      <div className={style.page}>
         <Outlet />
         {statuses && <ParamsBtns statuses={statuses} />}
         <ul className={style.page__navbar_list}>
            {menu}
         </ul>
         <ul className={style.page__list}>
            {children}
         </ul>
      </div>

   )
}

export default DefaultPage