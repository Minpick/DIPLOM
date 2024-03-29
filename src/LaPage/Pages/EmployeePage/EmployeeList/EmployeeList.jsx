import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { BASE_URL, fetchEmployees } from '../../../API/requests'
import style from './EmployeeList.module.scss'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'
import axios from 'axios'

import { Link, useSearchParams } from 'react-router-dom'
import { queryClient } from '../../../../App'
import PaginationBtns from '../../../UI/PaginationBtns/PaginationBtns'
import Loading from '../../../UI/Loading/Loading'

const EmployeeList = () => {
   const [page, setPage] = useState(0)
   const [searchParams, setSearchParams] = useSearchParams()
   const { data, isLoading } = useQuery({ queryKey: ['employees', page], queryFn: () => fetchEmployees(page) })
   const deleteEmployee = useMutation((id) => {
      return axios.delete(`${BASE_URL}/employee/info/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('employees')
      },
   });
   if (isLoading) {
      return (
         <Loading />
      )
   }
   const employees = data?.data?.map(client => {
      return (
         <li key={client.id}
            className={classNames('clients__item')}>
            <Link to={`edit/${client.id}?${searchParams.toString()}`}
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
         <PaginationBtns page={page} setPage={setPage} />
      </div>
   )
}

export default EmployeeList