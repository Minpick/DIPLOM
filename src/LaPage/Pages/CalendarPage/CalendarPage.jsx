import React, { useState } from 'react'
import style from './CalendarPage.module.scss'
import { BASE_URL } from '../../API/requests'
import axios from 'axios'
import { useQuery } from 'react-query'
import CalendarBar from './CalendarBar/CalendarBar'


export async function fetchDays(year, month) {
   const data = await axios.get(`${BASE_URL}/calendar/${year}/${month}`)
   return data.data
}

const CalendarPage = () => {
   const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
   const displayedWeekDays = weekDays.map((el) => {
      return (
         <div className={style.weekDay} key={el}>
            {el}
         </div>
      )
   })
   const [year, setYear] = useState(new Date().getFullYear())
   const [month, setMonth] = useState(new Date().getMonth()+1)
   console.log(month)
   const { data } = useQuery({ queryKey: ['days', year, month], queryFn: () => fetchDays(year, month) })
   const displayedDays = data?.map((el, index) => {
      return (
         <div className={style.day} key={index}>
            {index + 1}
         </div>
      )
   })
   console.log(data)
   return (
      <div className={style.wrapper}>
         <CalendarBar month = {month} year = {year} setMonth={setMonth}/>
         <div className={style.weekDays}>{displayedWeekDays}</div>
         <div className={style.days}>
            {displayedDays}
         </div>
      </div>
   )
}

export default CalendarPage