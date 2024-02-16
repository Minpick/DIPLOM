import React from 'react'
import { redirect, useActionData, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'
import Loading from '../../../UI/Loading/Loading'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'


export async function action({ request }) {
   // console.log(params)
   // return redirect(`..`)
   const searchParams = new URL(request.url)
   .searchParams.toString()
   console.log(searchParams)
   // return redirect(`..?${searchParams}`)
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
      email:email,
      phone:phone,
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
      const data = await axios.post(`${BASE_URL}/employee/clients/new`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      // return <Loading/>
      console.log(err.response.data.phone)
      return err
   }
   finally{
      queryClient.invalidateQueries('clients')
   }
}

const CreateClient = () => {
   const action = useActionData()

   // console.log(action)
   // const createClient = useMutation((user) => {
   //    return axios.post(`${BASE_URL}/employee/clients/new`, user);
   // }, {
   //    onSuccess: () => {
   //       queryClient.invalidateQueries('clients')
   //    },
   // });
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

   return (
      <PopUpAdd>
         <div className='form_wrapper'>
            <ClientsForm
               statuses={statuses}
               action = {action}
            />
         </div>
      </PopUpAdd>
   )
}


export default CreateClient