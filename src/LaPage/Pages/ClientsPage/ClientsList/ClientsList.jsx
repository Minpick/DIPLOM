import React, { useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery } from 'react-query'
import { BASE_URL, fetchClients } from '../../../API/requests'
import style from './ClientsList.module.scss'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'
import axios from 'axios'

import { Link, useSearchParams } from 'react-router-dom'
import { queryClient } from '../../../../App'
import PaginationBtns from '../../../UI/PaginationBtns/PaginationBtns'

const ClientsList = () => {
   const [page,setPage]=useState(0)
   const [searchParams,setSearchParams]= useSearchParams()
   const status = searchParams.get('status')
   const { data } = useQuery({ queryKey: ['clients',page,status], queryFn: ()=>fetchClients(page,status) })
   useEffect(() => {
      queryClient.invalidateQueries('clients');
    }, [status]);
   const deleteClient = useMutation((id) => {
      return axios.delete(`${BASE_URL}/clients/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('clients')
      },
   });
   const clients = data?.data?.map(client => {
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
               <DeleteButton onClick={() => deleteClient.mutate(client.id)} />
            </li>
      )
   })
   return (
      <div className={style.list}>
         {clients}
         <PaginationBtns  page={page} setPage={setPage}   />
      </div>
   )
}

export default ClientsList