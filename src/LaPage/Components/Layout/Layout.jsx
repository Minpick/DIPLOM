import React from 'react'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import style from './Layout.module.scss'
import classNames from 'classnames'

const Layout = () => {

  return (
    <div className={classNames(style.layout,style.wrapper)}>  
    <Header/>
    <Sidebar/>
    <div className={style.comp_wrapper}>

    <Outlet/>
    </div>
    </div>
  )
}

export default Layout