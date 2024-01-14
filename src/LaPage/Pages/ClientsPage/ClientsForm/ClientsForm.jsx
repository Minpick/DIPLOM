import React, { useEffect, useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Form, useLocation } from 'react-router-dom'
import './ClientsForm.scss'

const ClientsForm = ({func,data,role}) => {
   const location = useLocation()
   const btn_text = location.pathname === '/la/clients/new' ? 'Добавить клиента' :
   location.pathname === '/la/clients/edit'?'Редактировать клиента' :
   location.pathname === '/la/employee/new'?'Создать сотрудника' : 'Редактировать сотрудника'
   const [addData, setAddData] = useState({
      firstName: '',
      lastName: '',
      patronymic: '',
      phone: '',
      email: '',
      passport: '',
      comment: '',
      birth: '',
      role:role||''
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
   function onSubmit(event) {
      const formData = new FormData(event.target)
      const user = {
         firstName: formData.get("firstName"),
         lastName: formData.get("lastName"),
         patronymic: formData.get("patronymic"),
         phone: formData.get("phone"),
         email: formData.get("email"),
         passport: formData.get("passport"),
         comment: formData.get("comment"),
         birth: formData.get('birth'),
         role: role
      }
      func.mutate(user)
   }

   data&&useEffect(() => {
         setAddData({
            firstName: data?.data.firstName,
            lastName: data?.data.lastName,
            patronymic: data?.data.patronymic,
            phone: data?.data.phone,
            email: data?.data.email,
            passport: data?.data.passport,
            comment: data?.data.comment,
            birth: data?.data?.birth?.substring(0,10),
            role:data?.data.role
         })
      }, [data])
  return (
   <PopUpAdd>
   <Form
      onSubmit={(event)=>onSubmit(event)}
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
            value={addData.lastName||''}
            type="text"
            className='add_input'
         />
         <label htmlFor="firstName" className="add_label">Имя*</label>
         <input
            name="firstName"
            type="text"
            onChange={handleChange}
            value={addData.firstName||''}
            required
            className='add_input'

         />
         <label htmlFor="patronymic" className="add_label">Отчество</label>
         <input
            name="patronymic"
            value={addData.patronymic||''}
            type="text"
            className='add_input'
            onChange={handleChange}
         />
         <label htmlFor="email" className="add_label">Электронная почта</label>
         <input
            name="email"
            type="email"
            value={addData.email||''}
            className='add_input'
            onChange={handleChange}
         />
         <label htmlFor="phone" className="add_label">Телефон*</label>
         <input
            required
            name="phone"
            type="phone"
            value={addData.phone||''}
            className='add_input'
            onChange={handleChange}
         />
         <label htmlFor="passport" className="add_label">Паспорт</label>
         <input
            name="passport"
            type="text"
            value={addData.passport||''}
            className='add_input'
            onChange={handleChange}
         />
         <label htmlFor="birth" className="add_label">Дата рождения</label>
         <input
            name="birth"
            type="date"
            value={addData.birth||''}
            className='add_input'
            onChange={handleChange}
         />
         <button
            className='add_btn'
         >
            {btn_text}
         </button>
      </div>
      {!role&&<div className='add_right'>
         <textarea
            placeholder="Комментарии"
            name="comment"
            value={addData.comment||''}
            className="add_comment"
            onChange={handleChange}
         />
      </div>}
   </Form>
</PopUpAdd >
  )
}

export default ClientsForm