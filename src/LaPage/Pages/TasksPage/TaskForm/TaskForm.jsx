import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import Loading from '../../../UI/Loading/Loading'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Form, useSearchParams } from 'react-router-dom'
import moment from 'moment'

const TaskForm = ({ func, data, isLoading, recipients }) => {
   const location = useLocation()
   const btn_text = location.pathname === '/la/tasks/new' ? 'Добавить задачу' : 'Редактировать задачу'
   const [addData, setAddData] = useState({
      name: '',
      comment: '',
      expiryDate: '',
      timestamp: '',
      recipientId: ''
   })
   const [searchParams, setSearchParams] = useSearchParams()

   const status = searchParams.get('status')
   console.log(status)
   const [statusState,setStatusState] = useState('')
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
      const task = {
         name: formData.get('name'),
         comment: formData.get("comment"),
         expiryDate: formData.get('expiryDate') + "T00:00:00.000+00:00",
         recipientId: formData.get('recipientId') || data?.data.recipientId,
         taskStatus:statusState
      }

      // recipientId:formData.get('recipientId')
      console.log(task)
      func.mutate(task)
   }
   data && useEffect(() => {
      setAddData({
         name: data?.data.name,
         comment: data?.data.comment,
         expiryDate: data?.data.expiryDate.substring(0, 10),
         timestamp: data?.data.timestamp,
         recipientId: data?.data.recipientId,
      })
   }, [data])
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <PopUpAdd>
         <div className='form_wrapper'>
         <Form
            onSubmit={(event) => onSubmit(event)}
            method="post"
            className="add_form"
            replace
         >
            <div className='add_left'>
               <label htmlFor="name" className="add_label">Название*</label>
               <input
                  required
                  name="name"
                  onChange={handleChange}
                  value={addData.name || ''}
                  type="text"
                  className='add_input'
               />




               <label htmlFor="expiryDate" className="add_label">Крайний срок*</label>
               <input
                  name="expiryDate"
                  type="date"
                  value={addData.expiryDate || ''}
                  className='add_input'
                  onChange={handleChange}
                  required
               />


               {recipients && <>
                  <label htmlFor="recipient" className="add_label">Исполнитель</label>
                  <select
                     name='recipientId'
                     value={addData.recipientId}
                     onChange={handleChange}
                     className='add_select'>
                     {recipients.map((recipient) => {
                        return (
                           <option key={recipient.id} value={recipient.id}>{`${recipient.firstName} ${recipient.lastName} ${recipient.patronymic}`}</option>
                        )
                     })}
                  </select>
               </>}


               <button
                  className='add_btn'
                  onClick={() => {setStatusState('IN_PROGRESS')}}
               >
                  {status=='completed'?"Возобновить задачу":btn_text}
               </button>
               {location.pathname.substring(0,14) === '/la/tasks/edit'&&status!=="completed"&&<button
                  className='add_btn'
                  onClick={() => {setStatusState('COMPLETED')}}
               >
                  {status=='completed'?'Возобновить задачу':'Завершить задачу'}
               </button>}
               {data && <>
                  <div style={{ display: 'flex', marginBottom: '-10px' }}>
                     <label className="add_label">Дата создания:</label>
                     <div className='timestamp'>
                        {moment(addData.timestamp).format('DD.MM.YYYY')}
                     </div>
                  </div>
               </>}
            </div>
            <div className='add_right'>
               <textarea
                  placeholder="Комментарии"
                  name="comment"
                  value={addData.comment || ''}
                  className="add_comment"
                  onChange={handleChange}
               />
            </div>
         </Form>
         </div>
      </PopUpAdd >
   )
}

export default TaskForm