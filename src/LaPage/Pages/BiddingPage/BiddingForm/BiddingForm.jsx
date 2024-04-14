import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import style from './BiddingForm.module.scss'
import { queryClient } from '../../../../App'
import { DatePicker, Space } from 'antd'
import { locale } from '../../../API/locale'
import moment from 'moment'

const BiddingForm = ({ data }) => {
   const numberRef = useRef(null)
   const initialPriceRef = useRef(null)
   const depositRef = useRef(null)
   const nameRef = useRef(null)
   const marketValueRef = useRef(null)
   const expiryDateRef = useRef(null)
   const auctionDateRef = useRef(null)
   const auctionFormRef = useRef(null)
   const auctionTypeRef = useRef(null)
   const limitationsRef = useRef(null)
   const limitationDateRef = useRef(null)
   const linkRef = useRef(null)
   const areaNameRef = useRef(null)
   useEffect(() => {
      if (data) {
         numberRef.current.defaultValue = data?.data.number
         initialPriceRef.current.defaultValue = data?.data.initialPrice
         depositRef.current.defaultValue = data?.data.deposit
         nameRef.current.defaultValue = data?.data.name
         marketValueRef.current.defaultValue = data?.data.marketValue
         expiryDateRef.current.defaultValue = data?.data.expiryDate.substring(0, 10)
         auctionDateRef.current.defaultValue = data?.data.auctionDate.substring(0, 10)
         auctionFormRef.current.value = data?.data.auctionForm
         auctionTypeRef.current.defaultValue = data?.data.auctionType
         limitationsRef.current.defaultValue = data?.data.limitations
         limitationDateRef.current.defaultValue = data?.data.limitationDate.substring(0, 10)
         linkRef.current.defaultValue = data?.data.link
         areaNameRef.current.defaultValue = data?.data.areaName


      }
   }, [data])
   return (
      <Form
         replace
         className={style.form}
         method='post'
      >
         <label htmlFor="number" className={style.label}>Номер лота</label>
         <input
            name="number"
            ref={numberRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="initialPrice" className={style.label}>Начальная цена</label>
         <input
            name="initialPrice"
            ref={initialPriceRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="deposit" className={style.label}>Задаток</label>
         <input
            name="deposit"
            ref={depositRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="name" className={style.label}>Название</label>
         <input
            name="name"
            ref={nameRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="marketValue" className={style.label}>Рыночная цена</label>
         <input
            name="marketValue"
            ref={marketValueRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="expiryDate" className={style.label}>Крайний срок подачи заявки</label>
         <input
            name="expiryDate"
            ref={expiryDateRef}
            type="date"
            className={style.input}
         />
         <label htmlFor="auctionDate" className={style.label}>Дата торгов</label>
         <input
            name="auctionDate"
            ref={auctionDateRef}
            type="date"
            className={style.input}
         />
         <label htmlFor="auctionForm" className={style.label}>Форма торгов</label>
         <select
            name='auctionForm'
            className={style.select}
            ref={auctionFormRef}
         >
            <option value={'DOWNGRADE'}>
               На понижение
            </option>
            <option value={'RAISING'}>
               На повышение
            </option>
         </select>
         <label htmlFor="auctionType" className={style.label}>Тип аукциона</label>
         <input
            name="auctionType"
            ref={auctionTypeRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="limitations" className={style.label}>Ограничени</label>
         <input
            name="limitations"
            ref={limitationsRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="limitationDate" className={style.label}>Дата ограничений</label>
         <input
            name="limitationDate"
            ref={limitationDateRef}
            type="date"
            className={style.input}
         />
         <label htmlFor="link" className={style.label}>Ссылка</label>
         <input
            name="link"
            ref={linkRef}
            type="text"
            className={style.input}
         />
         <label htmlFor="areaName" className={style.label}>Площадка</label>
         <input
            name="areaName"
            ref={areaNameRef}
            type="text"
            className={style.input}
         />
         <button className={style.btn}>
            Отправить
         </button>
      </Form>
   )
}

export default BiddingForm