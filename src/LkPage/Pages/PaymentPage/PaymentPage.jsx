import React from 'react'
import style from './PaymentPage.module.scss'
import axios from 'axios'
import { BASE_URL } from '../../../LaPage/API/requests'
import { useQuery } from 'react-query'
import PaymentCard from './PaymentCard/PaymentCard'


async function fetchClientPayment() {
   const data = await axios.get(`${BASE_URL}/deal/forClient/payment`)
   return data.data
}

const PaymentPage = () => {
   const { data , isSuccess} = useQuery('clientPayment', fetchClientPayment)
   console.log(data)
   const uniqueValues = []

   if (isSuccess) {
      data?.forEach(item => {
         // Получаем значение, которое будем проверять на уникальность
         const value = item.nameDeal; // Например, имя

         // Проверяем, есть ли значение в массиве уникальных значений
         if (!uniqueValues.includes(value)) {
            // Если значение не существует, добавляем его в массив
            uniqueValues.push(value);
         }
      })
   }
   const displayed = uniqueValues.map((el) => {
      return (
         <PaymentCard key={el} data={data?.filter((payment) => payment.nameDeal === el)} />
      )
   })
   return (
      <div className={style.wrapper}>
         {displayed}
      </div>
   )
}

export default PaymentPage