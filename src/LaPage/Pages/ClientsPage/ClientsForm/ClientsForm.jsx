import React, { useEffect, useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Form, Link, useLocation, useSearchParams } from 'react-router-dom'
import './ClientsForm.scss'
import Loading from '../../../UI/Loading/Loading'
import DefaultForm from '../../../Components/DefaultForm/DefaultForm'
import MyInput from '../../../UI/MyInput/MyInput'
import MySelect from '../../../UI/MySelect/MySelect'
import MyDatePicker from '../../../UI/MyDatePicker/MyDatePicker'
import MyTextarea from '../../../UI/MyTextarea/MyTextarea'

const ClientsForm = ({ data, statuses, isLoading }) => {
   const location = useLocation()

   if (isLoading) {
      return (
         <Loading />
      )
   }
   console.log(data)

   return (
      <DefaultForm
         left={
            <>
               <MyInput name={'lastName'} text={'Фамилия*'} defaultValue={data?.lastName} required />
               <MyInput name={'firstName'} text={'Имя*'} defaultValue={data?.firstName} required />
               <MyInput name={'patronymic'} text={'Отчество'} defaultValue={data?.patronymic} />
               <MyInput name={'email'} text={'Электронная почта'} defaultValue={data?.email} type="email" />
               <MyInput name={'phone'} text={'Телефон'} defaultValue={data?.phone} mask={'8 (999) 999-99-99'} />
               <MyInput name={'passport'} text={'Паспорт'} defaultValue={data?.passport} mask={'99 99 999999'} maskChar={' '} />
               <MyDatePicker name={'birth'} text={'Дата рождения'} format={"DD.MM.YYYY"} defaultValue={data?.birth} />
               {location.pathname.substring(0, 11) === '/la/clients' && !data?.role &&
                  <>
                     <MyInput name={'login'} text={'Логин госуслуг'} defaultValue={data?.login} />
                     <MyInput name={'passwordForService'} text={'Пароль госуслуг'} defaultValue={data?.passwordForService} />
                  </>
               }
               {statuses &&
                  <MySelect name={'status'} text={'Статус'} defaultValue={data?.status}
                     options={statuses}
                  />
               }
               {location.pathname.substring(0, 11) === '/la/employe' &&
                  <>
                     <MySelect name={'role'} text={'Статус'} defaultValue={data?.role}
                        options={
                           [
                              { 'ROLE_EMPLOYEE': 'Сотрудник' },
                              { 'ROLE_ADMIN': 'Администратор' }
                           ]
                        }
                     />
                  </>
               }
            </>
         }
         right={
            <>
               {location.pathname.substring(0, 11) === '/la/clients' && !data?.role &&
                  <>
                     <MyInput name={'passportIssued'} text={'Кем выдан'} defaultValue={data?.passportIssued} />
                     <MyDatePicker name={'dateIssuePassport'} text={'Дата выдачи паспорта'} format={"DD.MM.YYYY"} defaultValue={data?.dateIssuePassport} />
                     <MyInput name={'passportIssued'} text={'Кем выдан'} defaultValue={data?.passportIssued} />
                     <MyInput name={'kp'} text={'Код подразделения'} defaultValue={data?.kp} mask={'999-999'} />
                     <MyInput name={'registrationAddress'} text={'Адрес регистрации'} defaultValue={data?.registrationAddress} />
                     <MyInput name={'snils'} text={'СНИЛС'} defaultValue={data?.snils} mask={'999-999-999 99'} />
                     <MyInput name={'placeOfBirth'} text={'Место рождения'} defaultValue={data?.placeOfBirth} />
                     <MyTextarea name={'comment'} defaultValue={data?.comment} placeholder={'Комментарий'}/>
                  </>
               }
            </>
         }
      />
         )
}

export default ClientsForm