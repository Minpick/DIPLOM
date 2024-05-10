import React from 'react'
import style from './Appointment.module.scss'
import { useSearchParams } from 'react-router-dom'
import moment from 'moment'
import classNames from 'classnames'

const Appointment = ({ date, children }) => {
   const [searchParams, setSearchParams] = useSearchParams()
   const day = searchParams.get('day')
   const month = searchParams.get('month')
   const year = searchParams.get('year')
   const pickedDate = moment(`${year}-${month?.padStart(2, 0)}-${day?.padStart(2, 0)}`).format('YYYY-MM-DD')
   const isActive = pickedDate === date
   console.log(isActive)
   return (
      <div className={style.wrapper}>
         {isActive && <div className={style.appointmentWrapper}>
            <h1 className={style.h}>Записаться на встречу</h1>

         </div>}
         {children}
      </div>
   )
}

export default Appointment