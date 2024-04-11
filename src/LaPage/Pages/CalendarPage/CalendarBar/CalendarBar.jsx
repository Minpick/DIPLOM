import React from 'react'
import style from './CalendarBar.module.scss'
import PaginationBtns from '../../../UI/PaginationBtns/PaginationBtns'
import { useSearchParams } from 'react-router-dom'

const CalendarBar = ({ month, year,setMonth }) => {
   const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
   const currentMonth = months[month - 1]
   // console.log(month,year)
// console.log(month)
   return (
      <div className={style.wrapper}>
         <div className={style.left}>
            <div className={style.month}>{currentMonth}</div>
            <div className={style.year}>{year}</div>
         </div>
         <div className={style.right}>
            <div className={style.btns}><PaginationBtns page={month} setPage={setMonth} /></div>
         </div>
      </div>
   )
}

export default CalendarBar