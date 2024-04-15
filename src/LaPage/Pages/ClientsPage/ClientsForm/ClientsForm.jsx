import React, { useEffect, useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Form, Link, useLocation, useSearchParams } from 'react-router-dom'
import './ClientsForm.scss'
import Loading from '../../../UI/Loading/Loading'
import Warning from '../../../UI/Warning/Warning'

const ClientsForm = ({ data, statuses, isLoading, action }) => {
   const [actionState, setActionState] = useState()
   useEffect(() => {
      if (action) {
         setActionState(true)
      }
   }, [action])
   const location = useLocation()
   const btn_text = location.pathname === '/la/clients/new' ? 'Добавить клиента' :
      location.pathname.substring(0, 15) === '/la/clients/edi' ? 'Редактировать клиента' :
         location.pathname === '/la/employee/new' ? 'Создать сотрудника' : 'Редактировать сотрудника'
   const [addData, setAddData] = useState({
      firstName: '',
      lastName: '',
      patronymic: '',
      phone: '',
      email: '',
      passport: '',
      comment: '',
      birth: '',
      role: '',
      status: '',
      login: '',
      password: '',
      passportIssued:'',
      dateIssuePassport:'',
      kp:'',
      registrationAddress:'',
      snils:'',
      placeOfBirth:''

   })

   function handleChange(event) {
      const { name, value, type, checked } = event.target
      setAddData(prevFormData => {
         return {
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
         }
      })
   }
   // function onSubmit(event) {
   //    const formData = new FormData(event.target)
   //    const user = {
   //       firstName: formData.get("firstName"),
   //       lastName: formData.get("lastName"),
   //       patronymic: formData.get("patronymic"),
   //       phone: formData.get("phone"),
   //       email: formData.get("email"),
   //       passport: formData.get("passport"),
   //       comment: formData.get("comment"),
   //       birth: formData.get('birth'),
   //       role: role,
   //       status: formData.get('status'),
   //       login: formData.get('login'),
   //       password: formData.get('password')
   //    }
   //    console.log(user)

   //       func.mutate(user)

   // }
   data && useEffect(() => {
      setAddData({
         firstName: data?.data.firstName,
         lastName: data?.data.lastName,
         patronymic: data?.data.patronymic,
         phone: data?.data.phone,
         email: data?.data.email,
         passport: data?.data.passport,
         comment: data?.data.comment,
         birth: data?.data?.birth?.substring(0, 10),
         role: data?.data?.role,
         status: data?.data.status,
         login: data?.data.login,
         password: data?.data.password,
         passportIssued: data?.data.passportIssued,
         dateIssuePassport: data?.data.dateIssuePassport,
         kp: data?.data.kp,
         registrationAddress: data?.data.registrationAddress,
         snils: data?.data.snils,
         placeOfBirth: data?.data.placeOfBirth
      })
   }, [data])
   if (isLoading) {
      return (
         <Loading />
      )
   }
   const hideWarning = () => {
      setActionState(false)
   }
   return (


      <>

         {/* {actionState &&
               <Warning onClick={hideWarning} message={action?.response.data.phone?action?.response.data.phone:action?.response.data} />} */}
         <Form
            // onSubmit={(event) => onSubmit(event)}
            method="post"
            className="add_form"
            replace
         >
            <div className='add_left'>
               <label htmlFor="lastName" className="add_label">Фамилия*</label>
               <input
                  required
                  name="lastName"
                  onChange={handleChange}
                  value={addData.lastName || ''}
                  type="text"
                  className='add_input'
               />
               <label htmlFor="firstName" className="add_label">Имя*</label>
               <input
                  name="firstName"
                  type="text"
                  onChange={handleChange}
                  value={addData.firstName || ''}
                  required
                  className='add_input'

               />
               <label htmlFor="patronymic" className="add_label">Отчество</label>
               <input
                  name="patronymic"
                  value={addData.patronymic || ''}
                  type="text"
                  className='add_input'
                  onChange={handleChange}
               />
               <label htmlFor="email" className="add_label">Электронная почта</label>
               <input
                  name="email"
                  type="email"
                  value={addData.email || ''}
                  className='add_input'
                  onChange={handleChange}
               />
               <label htmlFor="phone" className="add_label">Телефон*</label>
               <input
                  required
                  name="phone"
                  type="phone"
                  value={addData.phone || ''}
                  className='add_input'
                  onChange={handleChange}
               />
               <label htmlFor="passport" className="add_label">Паспорт</label>
               <input
                  name="passport"
                  type="text"
                  value={addData.passport || ''}
                  className='add_input'
                  onChange={handleChange}
               />
               <label htmlFor="birth" className="add_label">Дата рождения</label>
               <input
                  name="birth"
                  type="date"
                  value={addData.birth || ''}
                  className='add_input'
                  onChange={handleChange}
               />
               {location.pathname.substring(0, 11) === '/la/clients' && !data?.data.role &&
                  <>
                     <label htmlFor="login" className="add_label">Логин госуслуг</label>
                     <input
                        name="login"
                        type="text"
                        value={addData.login || ''}
                        className='add_input'
                        onChange={handleChange}
                     />
                     <label htmlFor="password" className="add_label">Пароль госуслуг</label>
                     <input
                        name="password"
                        type="text"
                        value={addData.password || ''}
                        className='add_input'
                        onChange={handleChange}
                     />
                  </>
               }

               {statuses && <>
                  <label htmlFor="status" className="add_label">Статус</label>
                  <select
                     name='status'
                     value={addData.status}
                     onChange={handleChange}
                     className='add_select'>
                     {statuses.map((status) => {
                        return (
                           <option key={status.status} value={status.status.toUpperCase()}>{status.name}</option>
                        )
                     })}
                  </select>
               </>}
               {location.pathname.substring(0, 11) === '/la/employe' && <>
                  <label htmlFor="role" className="add_label">Права</label>
                  <select
                     name='role'
                     value={addData.role}
                     onChange={handleChange}
                     className='add_select'>
                     <option value='ROLE_EMPLOYEE'>Сотрудник</option>
                     <option value='ROLE_ADMIN'>Администратор</option>
                  </select>
               </>}
               <button
                  className='add_btn'
               >
                  {btn_text}
               </button>
            </div>
            {location.pathname.substring(0, 11) === '/la/clients' && !data?.data.role && <div className='add_right'>
               <div className='add_right_wrapper'>
                  <label htmlFor="passportIssued" className="add_label">Кем выдан</label>
                  <input
                     name="passportIssued"
                     type="text"
                     value={addData.passportIssued || ''}
                     className='add_input'
                     onChange={handleChange}
                  /><label htmlFor="dateIssuePassport" className="add_label">Когда выдан</label>
                  <input
                     name="dateIssuePassport"
                     type="date"
                     value={addData.dateIssuePassport || ''}
                     className='add_input'
                     onChange={handleChange}
                  /><label htmlFor="kp" className="add_label">КП</label>
                  <input
                     name="kp"
                     type="text"
                     value={addData.kp || ''}
                     className='add_input'
                     onChange={handleChange}
                  /><label htmlFor="registrationAddress" className="add_label">Адрес регистрации</label>
                  <input
                     name="registrationAddress"
                     type="text"
                     value={addData.registrationAddress || ''}
                     className='add_input'
                     onChange={handleChange}
                  /><label htmlFor="snils" className="add_label">СНИЛС</label>
                  <input
                     name="snils"
                     type="text"
                     value={addData.snils || ''}
                     className='add_input'
                     onChange={handleChange}
                  /><label htmlFor="placeOfBirth" className="add_label">Место рождения</label>
                  <input
                     name="placeOfBirth"
                     type="text"
                     value={addData.placeOfBirth || ''}
                     className='add_input'
                     onChange={handleChange}
                  />
               </div>

               <textarea
                  placeholder="Комментарии"
                  name="comment"
                  value={addData.comment || ''}
                  className="add_comment"
                  onChange={handleChange}
               />
            </div>}
         </Form>
      </>
   )
}

export default ClientsForm