import React, { useEffect, useState } from 'react'
import style from './Header.module.scss'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
   axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
   const [time, setTime] = useState(new Date())
   useEffect(() => {
      const interval = setInterval(() => {
       setTime(new Date());
      }, 5000);
      return () => {
         clearInterval(interval);
       };
    }, []);
   const location = useLocation()
   const btn_text = location.pathname.substring(0,7) === '/la/cli' ? 'Добавить клиента' :
      location.pathname.substring(0,7) === '/la/emp' ? 'Добавить сотрудника' :
         location.pathname.substring(0,7) === '/la/tas' ? 'Добавить задачу' :
            'Добавить сделку'
const [searchParams,setSearchParams]= useSearchParams()

   return (
      <div className={style.header}>
         <Link to={`new?${searchParams.toString()}`}
         relative='path'
            className={style.header__add_client}>{btn_text}
         </Link>

         <div className={style.header__time}>{time.toLocaleTimeString().substring(0, 5)}</div>
         <div className={style.header__user}>Кирилл Бусарев
            <Link 
            onClick={()=>{localStorage.clear();axios.defaults.headers.common ={}}}
            >
               <svg className={style.header__exit_svg} width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                     <path id="Vector" d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75" stroke="#ffffffde" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </g>
               </svg>
            </Link>
         </div>

      </div>
   )
}

export default Header