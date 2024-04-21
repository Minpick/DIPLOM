import React from 'react'
import style from './ScheduleDays.module.scss'
import { useQuery } from 'react-query'
import { BASE_URL } from '../../../../LaPage/API/requests'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'


export async function fetchSchedule(year, month) {
   const data = await axios.get(`${BASE_URL}/calendar/forClient/${year}/${month}`)
   return data.data
}
const ScheduleDays = ({year,month}) => {
   const { data } = useQuery({ queryKey: ['days', year, month], queryFn: () => fetchSchedule(year, month) })
   console.log(data)
   const displayedDays = data?.map((el, index) => {
      return (
         <div to={`info?year=${year}&month=${moment(el.createdAt).format('M')}&day=${moment(el.createdAt).format('D')}`} className={style.day} key={index} style={el.current ? { color: 'rgba(0, 0, 0, 0.713)' } : { color: '#77777734' }}>
            <div classame={style.numbers}>
               {moment(el.createdAt).format('D')}
               {el.count > 2 ? <span>+{el.count - 2}</span> : ''}
            </div>
            {el.count !== 0 && <div className={style.events}>
               {Object.keys(el.nameEvent).map((key, index) => index < 2 &&

                  (
                     <div key={key} className={style.event}>{`${key}`}</div>
                  ))}
            </div>
            }
         </div>
      )
   })
   return (
      <div className={style.days}>{displayedDays}</div>
   )
}

export default ScheduleDays