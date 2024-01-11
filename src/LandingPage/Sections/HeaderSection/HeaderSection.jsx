import React, { useEffect, useState } from 'react'
import style from './HeaderSection.module.scss'
import logosite from '../../images/logosite.png'
import classNames from 'classnames';

const HeaderSection = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
   const [isBurgerFollow, setIsBurgerFollow] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   const closeMenu = () => {
      setIsMenuOpen(false);
   };

   const handleScroll = () => {
      if (window.scrollY > 0) {
         setIsBurgerFollow(true);
      } else {
         setIsBurgerFollow(false);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);



   return (
      <>
         <div
            className={classNames(style.overlay, isMenuOpen ? style.overlay_show : '')}
            onClick={toggleMenu}></div>
         <header className={style.header}>
            <a href="#"
               className={classNames(style.burger, isBurgerFollow ? style.burger_follow : '')} onClick={toggleMenu}><span></span></a>
            <div className={style.container}>
               <div className={classNames(style.header__inner, isMenuOpen ? style.header__inner_open : '')}>

                  <a className={style.header__logo} href="#">
                     <img src={logosite} alt="Logo" />
                  </a>
                  <nav className={style.header__menu}>
                     <ul className={style.header__menu_list}>
                        <li className={style.header__menu_item}>
                           <a
                              className={classNames(style.header__menu_link)}
                              onClick={closeMenu}

                              href="#">Главная</a>
                        </li>
                        <li className={style.header__menu_item}>
                           <a
                              className={classNames(style.header__menu_link)}
                              onClick={closeMenu}
                              href="#services">Услуги</a>
                        </li>
                        <li className={style.header__menu_item}>
                           <a
                              className={classNames(style.header__menu_link)}
                              onClick={closeMenu}
                              href="#team">Наша команда</a>
                        </li>
                        <li className={style.header__menu_item}>
                           <a
                              className={classNames(style.header__menu_link)}
                              onClick={closeMenu}
                              href="#footer">Наши контакты</a>
                        </li>
                        <li className={style.header__menu_item}>
                           <a
                              className={classNames(style.header__menu_link)}
                              onClick={closeMenu}
                              href="auth.html">Личный кабинет</a>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
         </header>

      </>
   )
}

export default HeaderSection