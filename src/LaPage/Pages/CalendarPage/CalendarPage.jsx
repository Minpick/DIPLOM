import React, { useEffect, useState } from 'react'
import style from './CalendarPage.module.scss'
import { BASE_URL } from '../../API/requests'
import axios from 'axios'
import { useQuery } from 'react-query'
import CalendarBar from './CalendarBar/CalendarBar'
import moment from 'moment'
import { Link, Outlet, useSearchParams } from 'react-router-dom'


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
   const [searchParams, setSearchParams] = useSearchParams()
   const [year, setYear] = useState(searchParams.get('year'))
   const [month, setMonth] = useState(searchParams.get('month'))
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
   const { data } = useQuery({ queryKey: ['days',year,month], queryFn: () => fetchDays(year, month) })
   console.log(month)
   const colors = {
      'COURT':"#ad2d2ddd",
      'CONSULT':"#3788d8",
      'ETC':"#303030"
   }
   const displayedDays = data?.map((el, index) => {
      return (
         <Link to={`info?year=${year}&month=${month}&day=${moment(el.createdAt).format('D')}`} className={style.day} key={index} style={el.current ? { color: 'rgba(0, 0, 0, 0.713)' } : { color: '#77777734' }}>
           <div className={style.numbers}>
               {moment(el.createdAt).format('D')}
               {el.count>2?<span>+{el.count-2}</span>:''}
           </div>
            {el.count!==0 && <div className={style.events}>
               {Object.keys(el.nameEvent).map((key,index) => index<2&&
               
               (   
                  <div key={key} className={style.event} style={{backgroundColor:colors[el.nameEvent[key]]}}>{`${key}`}</div>
               ))}
            </div>
            }
         </Link>
      )
   })
   // console.log(month)
   // console.log(data)
   return (
      <div className={style.wrapper}>
            <Outlet/>
            <CalendarBar month={month} year={year} setMonth={setMonth} />
            <div className={style.weekDays}>{displayedWeekDays}</div>
            <div className={style.days}>
               {displayedDays}
            </div>
         </div>
   )
}

export default CalendarPage