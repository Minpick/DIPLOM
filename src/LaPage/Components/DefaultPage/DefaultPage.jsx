import React from 'react'
import style from './DefaultPage.module.scss'
import { Outlet } from 'react-router'

const DefaultPage = ({li1,li2,li3,children}) => {

  return (
    <div className={style.page}>
      <Outlet/>
      <ul className={style.page__navbar_list}>
        <li className={style.page__navbar_item}>{li1}</li>
        <li className={style.page__navbar_item}>{li2}</li>
        <li className={style.page__navbar_item}>{li3}</li>
      </ul>
      <ul className={style.page__list}>
{children}
      </ul>
    </div>

  )
}

export default DefaultPage