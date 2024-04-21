import React, { useEffect, useState } from 'react'
import style from './SchedulePage.module.scss'
import { useSearchParams } from 'react-router-dom'
import ScheduleDays from './ScheduleDays/ScheduleDays'
import ScheduleBar from './ScheduleBar/ScheduleBar'

const SchedulePage = () => {
   const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
   const displayedWeekDays = weekDays.map((el) => {
      return (
         <div className={style.weekDay} key={el}>
            {el}
         </div>
      )
   })
   const [searchParams, setSearchParams] = useSearchParams()
   const [year, setYear] = useState(parseInt(searchParams.get('year')))
   const [month, setMonth] = useState(parseInt(searchParams.get('month')))
   // console.log(month)
   // function setCorrectMonth(month){
   //    setMonth(month)
   //    searchParams.set('month',month)
   // }
   useEffect(() => {
      if (month === 0) {
         setMonth(12)
         setYear(year => year - 1)
      }
      if (month === 13) {
         setMonth(1)
         setYear(year => year + 1)
      }
   }, [month])

   return (
      <>
         <ScheduleBar month={month} year={year} setMonth={setMonth} />
         <div className={style.wrapper}>
            <div className={style.weekDays}>{displayedWeekDays}</div>
            <ScheduleDays year={year} month={month} />
         </div>
      </>
   )
}

export default SchedulePage