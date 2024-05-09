import React from 'react'
import { Form, useLocation } from 'react-router-dom'
import MyInput from '../../../UI/MyInput/MyInput'
import MyNumberInput from '../../../UI/MyNumberInput/MyNumberInput'
import MySelect from '../../../UI/MySelect/MySelect'
import MyDatePicker from '../../../UI/MyDatePicker/MyDatePicker'
import DefaultForm from '../../../Components/DefaultForm/DefaultForm'

const BiddingForm = ({ data }) => {

   return (
      <DefaultForm
         data={data}
         left={
            <>
               <MyInput name={'number'} text={'Номер лота'} defaultValue={data?.number} />
               <MyNumberInput name={'initialPrice'} text={'Начальная цена'} defaultValue={data?.initialPrice} />
               <MyNumberInput name={'deposit'} text={'Задаток'} defaultValue={data?.deposit} />
               <MyInput name={'name'} text={'Название'} defaultValue={data?.name} />
               <MyNumberInput name={'marketValue'} text={'Рыночная цена'} defaultValue={data?.marketValue} />
               <MySelect name={'auctionForm'} text={'Форма торгов'} defaultValue={data?.auctionForm}
                  options={
                     [
                        { 'RAISING': 'На повышение' },
                        { 'DOWNGRADE': 'На понижение' }
                     ]
                  } />
            </>
         }
         right={
            <>
               <MyDatePicker name={'auctionDate'} text={'Дата торгов'} format={"DD.MM.YYYY HH:mm"} defaultValue={data?.auctionDate} />
               <MyDatePicker name={'expiryDate'} text={'Дата подачи заявки'} format={"DD.MM.YYYY HH:mm"} defaultValue={data?.expiryDate} />
               <MyInput name={'auctionType'} text={'Тип аукциона'} defaultValue={data?.auctionType} />
               <MyInput name={'limitations'} text={'Ограничения'} defaultValue={data?.limitations} />
               <MyDatePicker name={'limitationDate'} text={'Дата ограничений'} format={"DD.MM.YYYY"} defaultValue={data?.limitationDate} />
               <MyInput name={'link'} text={'Ссылка'} defaultValue={data?.link} />
               <MyInput name={'areaName'} text={'Площадка'} defaultValue={data?.areaName} />
            </>
         }
      />
      
   )
}

export default BiddingForm