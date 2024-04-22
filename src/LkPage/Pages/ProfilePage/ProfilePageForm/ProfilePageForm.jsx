import React, { useRef } from 'react'
import style from './ProfilePageForm.module.scss'
import CustomInput from '../../../UI/CustomInput/CustomInput'
import moment from 'moment'
import { Form, useNavigate } from 'react-router-dom'

const ProfilePageForm = ({ data }) => {
   const navigate = useNavigate()
   return (
      <Form
         className={style.form}
         method='post'
      >
         <CustomInput name={'lastName'} text={'Фамилия'} defaultValue={data?.lastName} />
         <CustomInput name={'firstName'} text={'Имя'} defaultValue={data?.firstName} />
         <CustomInput name={'patronymic'} text={'Отчество'} defaultValue={data?.patronymic} />
         <CustomInput name={'birth'} text={'Дата рождения'} defaultValue={moment(data?.birth).format('DD.MM.YYYY')} />
         <CustomInput name={'email'} text={'Электронная почта'} defaultValue={data?.email} />
         <CustomInput name={'phone'} text={'Телефон'} defaultValue={data?.phone} disabled={true}/>
         <div className={style.btnwrapper}>
            <button className={style.btn} type='submit'>Сохранить</button>
            <button onClick={() => { localStorage.clear(); navigate('/auth') }} className={style.btn}>Выйти</button>
         </div>
      </Form>
   )
}

export default ProfilePageForm