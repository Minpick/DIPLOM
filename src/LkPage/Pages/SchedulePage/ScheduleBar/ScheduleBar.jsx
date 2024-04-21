import React from 'react'
import style from './ScheduleBar.module.scss'
import PaginationBtns from '../../../../LaPage/UI/PaginationBtns/PaginationBtns'

const ScheduleBar = ({ month, year,setMonth }) => {
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

export default ScheduleBar