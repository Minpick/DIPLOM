import React, { useEffect, useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Await, Form, Link, NavLink, defer, redirect, useActionData, useLoaderData, useParams, useSearchParams } from 'react-router-dom'
import { BASE_URL, fetchClient } from '../../../API/requests'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { queryClient } from '../../../../App'
import ClientsForm from '../ClientsForm/ClientsForm'
import Loading from '../../../UI/Loading/Loading'
import DealBtns from '../../DealPage/DealBtns/DealBtns'
import style from './EditClient.module.scss'
import classNames from 'classnames'
import { clientFields, makeObject } from '../CreateClient/CreateClient'

export async function action({ request, params }) {
   const searchParams = new URL(request.url).searchParams.toString()
   const obj = await makeObject(request, clientFields)
   try {
       await axios.patch(`${BASE_URL}/employee/clients/${params.id}`, obj)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      return err
   }
   finally {
      queryClient.invalidateQueries('clients')
   }
}

const EditClient = () => {
   const action = useActionData()
   const { id } = useParams()
   const [searchParams, setSearchParams] = useSearchParams()
   const { data, isLoading } = useQuery({ queryKey: ['client'], queryFn: () => fetchClient(id) })
   // console.log(data)
   const statuses = [{
      'IN_PROGRESS': 'В работе'
   }, {
      'PLANNED': 'Планируемые'
   }, {
      'COMPLETED': 'Завершенные'
   }]
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <>
         <PopUpAdd>
            <div className={style.wrapper}>
               <div className={style.btnsWrapper}>
                  <NavLink
                     to={`/la/clients/${id}/edit?${searchParams.toString()}`}
                     // className='form_btn'
                     className={({ isActive }) =>
                        isActive ? classNames(style.btn, style.activeBtn) : style.btn
                     }
                  >
                     {data ? data?.data.lastName + ' ' + data?.data.firstName : 'Клиент'}
                  </NavLink>
                  <DealBtns />
               </div>
               <ClientsForm
                  isLoading={isLoading}
                  data={data.data}
                  statuses={statuses}
               />
            </div>
         </PopUpAdd>
      </>
   )
}


export default EditClient