import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router'
import style from './LkLayout.module.scss'

const LkLayout = () => {
  return (
    <div className={style.wrapper}>
        <Header/>
     <div className={style.container}>
        <Outlet/>
     </div>
    </div>
  )
}

export default LkLayout