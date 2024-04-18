import React, { useRef } from 'react'
import style from './ProfilePageForm.module.scss'
import { Form } from 'antd'
import CustomInput from '../../../UI/CustomInput/CustomInput'
import moment from 'moment'

const ProfilePageForm = ({data}) => {
   const firstNameRef = useRef(null)
   return (
      <Form
         className={style.form}
         method='post'
      >
         <CustomInput name={'firstName'} text={'Имя'} defaultValue={data?.firstName}/>
         <CustomInput name={'lastName'} text={'Фамилия'} defaultValue={data?.lastName}/>
         <CustomInput name={'patronymic'} text={'Отчество'} defaultValue={data?.patronymic}/>
         <CustomInput name={'birth'} text={'Дата рождения'} defaultValue={moment(data?.birth).format('DD.MM.YYYY')}/>
         <CustomInput name={'email'} text={'Электронная почта'} defaultValue={data?.email}/>
         <CustomInput name={'phone'} text={'Телефон'} defaultValue={data?.phone} disabled={true}/>
      </Form>
   )
}

export default ProfilePageForm