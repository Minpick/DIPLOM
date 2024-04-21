import React, { useEffect, useRef, useState } from 'react'
import { Form } from 'react-router-dom'
import style from './BiddingForm.module.scss'
import { queryClient } from '../../../../App'
import { DatePicker, Space } from 'antd'
import { locale } from '../../../API/locale'
import moment from 'moment'
import MyInput from '../../../UI/MyInput/MyInput'
import MySelect from '../../../UI/MySelect/MySelect'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs'
import MyDatePicker from '../../../UI/MyDatePicker/MyDatePicker'

const BiddingForm = ({ data }) => {
   // const dateTimeRef = useRef(null);
   // useEffect(() => {
   //    if (data) {
   //       dateTimeRef.current.value = data?.auctionDate
   //    }
   // }, [data])
   return (
      <Form
         replace
         className={style.form}
         method='post'
      >
         <div className={style.left}>
            <div className={style.leftInputs}>
               <MyInput name={'number'} text={'Номер лота'} defaultValue={data?.number} />
               <MyInput name={'initialPrice'} text={'Начальная цена'} defaultValue={data?.initialPrice} />
               <MyInput name={'deposit'} text={'Задаток'} defaultValue={data?.deposit} />
               <MyInput name={'name'} text={'Название'} defaultValue={data?.name} />
               <MyInput name={'marketValue'} text={'Рыночная цена'} defaultValue={data?.marketValue} />
               <MySelect name={'auctionForm'} text={'Форма торгов'} defaultValue={data?.auctionForm}>
                  <option
                     value={'RAISING'}>
                     На повышение
                  </option>
                  <option
                     value={'DOWNGRADE'}>
                     На понижение
                  </option>
               </MySelect>
            </div>
            <button className={style.btn}>
               Отправить
            </button>
         </div>
         <div className={style.right}>

            <MyDatePicker name={'auctionDate'} text={'Дата торгов'} format={"DD.MM.YYYY HH:mm"} defaultValue={data?.auctionDate} />
            <MyDatePicker name={'expiryDate'} text={'Дата подачи заявки'} format={"DD.MM.YYYY HH:mm"} defaultValue={data?.expiryDate} />
            <MyInput name={'auctionType'} text={'Тип аукциона'} defaultValue={data?.auctionType} />
            <MyInput name={'limitations'} text={'Ограничения'} defaultValue={data?.limitations} />
            <MyDatePicker name={'limitationDate'} text={'Дата ограничений'} format={"DD.MM.YYYY"} defaultValue={data?.limitationDate} />
            <MyInput name={'link'} text={'Ссылка'} defaultValue={data?.link} />
            <MyInput name={'areaName'} text={'Площадка'} defaultValue={data?.areaName} />
         </div>
      </Form>
   )
}

export default BiddingForm