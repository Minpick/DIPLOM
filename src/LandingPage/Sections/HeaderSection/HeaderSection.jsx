import React from 'react'
import style from './HeaderSection.module.scss'
import logosite from '../../images/logosite.png'

const HeaderSection = () => {
   return (
      <header className={style.header}>
         <a href="#" className={style.burger}><span></span></a>
         <div className={style.container}>
            <div className={style.header__inner}>
               <a className={style.header__logo} href="#">
                  <img src={logosite} alt="Logo"/>
               </a>
               <nav className={style.header__menu}>
                  <ul className={style.header__menu_list}>
                     <li className={style.header__menu_item}>
                        <a className={style.header__menu_link} href="#">Главная</a>
                     </li>
                     <li className={style.header__menu_item}>
                        <a className={style.header__menu_link} href="#services">Услуги</a>
                     </li>
                     <li className={style.header__menu_item}>
                        <a className={style.header__menu_link} href="#team">Наша команда</a>
                     </li>
                     <li className={style.header__menu_item}>
                        <a className={style.header__menu_link} href="#footer">Наши контакты</a>
                     </li>
                     <li className={style.header__menu_item}>
                        <a className={style.header__menu_link} href="auth.html">Личный кабинет</a>
                     </li>
                  </ul>
               </nav>
            </div>
         </div>
      </header>
   )
}

export default HeaderSection