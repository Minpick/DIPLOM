import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../../../API/requests'
import { useParams } from 'react-router'
import { useQuery } from 'react-query'
import style from './DealProgress.module.scss'
import moment from 'moment'



async function fetchDealProgress(deal) {
   const data = await axios.get(`${BASE_URL}/deal/progress/${deal}`)
   return data
}
const DealProgress = () => {
   const { deal } = useParams()
   const { data } = useQuery({ queryKey: ['dealProgress'], queryFn: () => fetchDealProgress(deal) })
   console.log(data?.data)
   const displayed = data?.data.map((el) => {
      return (
         <div className={style.item}>
            <div className={style.date}>
               {moment(el.createdAt).format('DD.MM.YYYY')}
            </div>
            <div className={style.comment}>
               {el.comment}
            </div>
         </div>
      )
   })
   return (
      <div className={style.wrapper}>
         {displayed}
      </div>
   )
}

export default DealProgress