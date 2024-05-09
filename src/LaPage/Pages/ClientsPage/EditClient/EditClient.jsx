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
import moment from 'moment'

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
   const passwordForService = formData.get("passwordForService")
   const birth = moment.utc(formData.get("birth"), 'DD.MM.YYYY').format('YYYY-MM-DD')
   const comment = formData.get("comment")
   const passport = formData.get("passport")
   const patronymic = formData.get("patronymic")
   const passportIssued = formData.get("passportIssued")
   const dateIssuePassport = moment.utc(formData.get("dateIssuePassport"), 'DD.MM.YYYY').format('YYYY-MM-DD')
   const kp = formData.get("kp")
   const registrationAddress = formData.get("registrationAddress")
   const snils = formData.get("snils")
   const placeOfBirth = formData.get("placeOfBirth")

   const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      status: status,
      patronymic: patronymic,
      login: login,
      passwordForService: passwordForService,
      birth: birth,
      comment: comment,
      passport: passport,
      passportIssued: passportIssued,
      dateIssuePassport: dateIssuePassport,
      kp: kp,
      registrationAddress: registrationAddress,
      snils: snils,
      placeOfBirth: placeOfBirth

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