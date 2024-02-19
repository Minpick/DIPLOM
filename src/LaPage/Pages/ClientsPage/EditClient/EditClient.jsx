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
import './EditClient.scss'
import classNames from 'classnames'

export async function action({ request, params }) {

   const searchParams = new URL(request.url)
      .searchParams.toString()
   const formData = await request.formData()
   const email = formData.get("email")
   const phone = formData.get("phone")
   const firstName = formData.get("firstName")
   const lastName = formData.get("lastName")
   const status = formData.get("status")
   const login = formData.get("login")
   const password = formData.get("password")
   const birth = formData.get("birth")
   const comment = formData.get("comment")
   const passport = formData.get("passport")
   const patronymic = formData.get("patronymic")

   const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      status: status,
      patronymic: patronymic,
      login: login,
      password: password,
      birth: birth,
      comment: comment,
      passport: passport

   }

   console.log(user)
   try {
      const data = await axios.patch(`${BASE_URL}/employee/clients/${params.id}`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      console.log(err.response.data)
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
   const editClient = useMutation((user) => {
      return axios.patch(`${BASE_URL}/employee/clients/${id}`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('clients')
      },
   });
   const statuses = [{
      status: 'in_progress',
      name: 'В работе'
   }, {
      status: 'planned',
      name: 'Планируемые'
   }, {
      status: 'completed',
      name: 'Завершенные'
   }]
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <>
         <PopUpAdd>
            <div className='form_wrapper'>

               <div className='form_btns_wrapper'>
                  <NavLink
                     to={`/la/clients/${id}/edit?${searchParams.toString()}`}
                     // className='form_btn'
                     className={({ isActive }) =>
                        isActive ? classNames('form_btn', 'form_btn_active') : 'form_btn'
                     }
                  >
                     {data ? data?.data.lastName + ' ' + data?.data.firstName : 'Клиент'}
                  </NavLink>
                  <DealBtns />
               </div>
               <ClientsForm
                  isLoading={isLoading}
                  data={data}
                  statuses={statuses}
                  action={action}
               />
            </div>
         </PopUpAdd>
      </>
   )
}


export default EditClient