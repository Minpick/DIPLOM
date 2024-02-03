import React from 'react'
import { redirect, useActionData, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'
import Loading from '../../../UI/Loading/Loading'


export async function action({ request }) {
   // console.log(params)
   // return redirect(`..`)
   const searchParams = new URL(request.url)
   .searchParams.toString()
   // return redirect(`..?${searchParams}`)
   const formData = await request.formData()
   const email = formData.get("email")
   const phone = formData.get("phone")
   const firstName = formData.get("firstName")
   const lastName = formData.get("lastName")
   
   const user = {
      firstName: firstName,
      lastName: lastName,
      email:email,
      phone:phone,
      status: 'IN_PROGRESS',
   }
   console.log(user)
   try {
      const data = await axios.post(`${BASE_URL}/employee/clients/new`, user)
      return redirect(`..?${searchParams}`)
   } catch (err) {
      // return <Loading/>
      return err
      console.log(err.response.data.phone)
   }
}

const CreateClient = () => {
   const action = useActionData()

   console.log(action)
   const createClient = useMutation((user) => {
      return axios.post(`${BASE_URL}/employee/clients/new`, user);
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

   return (
      <ClientsForm func={createClient}
         statuses={statuses}
         action = {action}
      />
   )
}


export default CreateClient