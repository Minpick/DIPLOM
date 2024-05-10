import React, { useEffect, useState } from 'react'
import style from './ScheduleDays.module.scss'
import { useQuery } from 'react-query'
import { BASE_URL } from '../../../../LaPage/API/requests'
import axios from 'axios'
import { Link, useSearchParams } from 'react-router-dom'
import moment from 'moment'
import Appointment from '../Appointment/Appointment'


export async function fetchSchedule(year, month) {
   const data = await axios.get(`${BASE_URL}/calendar/forClient/${year}/${month}`)
   return data.data
}
const ScheduleDays = ({ year, month }) => {
   const { data } = useQuery({ queryKey: ['days', year, month], queryFn: () => fetchSchedule(year, month) })
   const displayedDays = data?.map((el, index) => {
      return (
         <Link to={`?year=${year}&month=${moment(el.createdAt).format('M')}&day=${moment(el.createdAt).format('D')}`} className={style.day} key={index} style={el.current ? { color: 'rgba(0, 0, 0, 0.713)' } : { color: '#77777734' }}>
            <Appointment year={year} date={el.createdAt} month={month}>
               <div classame={style.numbers}>
                  {moment(el.createdAt).format('D')}
                  {Object.keys(el.nameEvent).map((key) =>
                  (
                     <div key={key} className={style.event}>{`${key}`}</div>
                  ))}
               </div>
            </Appointment>
         </Link>
      )
   })
   return (
      <div className={style.days}>{displayedDays}</div>
   )
}

export default ScheduleDays