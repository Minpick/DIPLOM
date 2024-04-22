import React from 'react'
import style from './PaymentCard.module.scss'
import moment from 'moment'

const PaymentCard = ({ data }) => {

   const displayed = data.map((el) => {
      return (
         <ul key={el.createdAt} className={style.contentWrapper}>
            <li className={style.content}>
               {moment(el.createdAt).format('DD.MM.YYYY')}
            </li>
            <li className={style.content}>
               {el.sum}
            </li>
            <li className={style.content}>
               {el.status==='CARD'?'Картой':'Наличными'}
            </li>
            <li className={style.content}>
               {el.bank}
            </li>
         </ul>
      )
   })
   return (
      <div className={style.wrapper}>
         <div className={style.heading}>Оплата по сделке {data[0].nameDeal}</div>
         <ul className={style.contentWrapper} style={{color:'black'}}>
            <li className={style.content}>
               Дата оплаты
            </li>
            <li className={style.content}>
               Сумма
            </li>
            <li className={style.content}>
               Тип
            </li>
            <li className={style.content}>
               Банк
            </li>
         </ul>
         {displayed}
      </div>
   )
}

export default PaymentCard