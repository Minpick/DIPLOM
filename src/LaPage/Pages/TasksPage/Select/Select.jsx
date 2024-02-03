import React, { useEffect, useState } from 'react'
import { fetchRecipients } from '../../../API/requests'
import { useQuery } from 'react-query'
import { useSearchParams } from 'react-router-dom'
import './select.scss'

const Select = () => {
   const [addData, setAddData] = useState({ recipientId: '' })
   const { data } = useQuery({ queryKey: ['recipients'], queryFn: fetchRecipients })
   const recipients = data?.data
   const [searchParams, setSearchParams] = useSearchParams()
   function handleChange(event) {
      const { name, value, type, checked } = event.target
      const status = searchParams.get('status')
      setSearchParams({ status: status, [name]: value });

   }

   return (
      <select
         name='recipientId'
         value={searchParams.get('recipientId')||''}
         onChange={handleChange}
         className='add_select task_select'>
            <option value=''>Все задачи</option>
         {recipients?.map((recipient) => {
            return (
               <option key={recipient.id} value={recipient.id}>{`${recipient.firstName} ${recipient.lastName} ${recipient.patronymic}`}</option>
            )
         })}
      </select>
   )
}

export default Select