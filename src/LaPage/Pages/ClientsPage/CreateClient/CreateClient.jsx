import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'

export async function action({request}) {
   const searchParams = new URL(request.url)
   .searchParams.toString()
   return redirect(`..?${searchParams}`)
}

const CreateClient = () => {
   const createClient = useMutation((user) => {
      return axios.post(`${BASE_URL}/employee/clients/new`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('clients')
      },
   });
   const statuses = [{
      status:'in_progress',
      name:'В работе'
    },{
      status:'planned',
      name:'Планируемые'
    },{
      status:'completed',
      name:'Завершенные'
    }]

   return (
      <ClientsForm func={createClient}
      statuses = {statuses}
      />
   )
}


export default CreateClient