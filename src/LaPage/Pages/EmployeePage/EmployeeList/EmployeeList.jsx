import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { BASE_URL,  fetchEmployees } from '../../../API/requests'
import style from './EmployeeList.module.scss'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'
import axios from 'axios'

import { Link } from 'react-router-dom'
import { queryClient } from '../../../../App'

const EmployeeList = () => {
   const { data } = useQuery({ queryKey: ['employees'], queryFn: fetchEmployees })
   const deleteEmployee = useMutation((id) => {
      return axios.delete(`${BASE_URL}/clients/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('employees')
      },
   });
   const employees = data?.data?.map(client => {
      return (
            <li key={client.id}
               className={classNames('clients__item')}>
               <Link to={`edit/${client.id}`}
                  className={classNames(style.clients__item, 'clients__item')}>
                  <div className={style.clients__field}>
                     {client.lastName + ' ' + client.firstName + ' ' + client.patronymic}
                  </div>
                  <div href="#" className={style.clients__field}>
                     {client.phone}
                  </div>
                  <div className={style.clients__field}>
                     {client.email}
                  </div>
               </Link>
               <DeleteButton onClick={() => deleteEmployee.mutate(client.id)} />
            </li>
      )
   })
   return (
      <div className={style.list}>
         {employees}
      </div>
   )
}

export default EmployeeList