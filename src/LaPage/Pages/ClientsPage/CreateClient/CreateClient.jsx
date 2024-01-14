import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../API/requests'
import { useMutation } from 'react-query'
import axios from 'axios'

import './CreateClient.scss'
import ClientsForm from '../ClientsForm/ClientsForm'
import { queryClient } from '../../../../App'

export async function action() {
   return redirect("..")
}

const CreateClient = () => {
   const createClient = useMutation((user) => {
      return axios.post(`${BASE_URL}/clients/new`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('clients')
      },
   });
  

   return (
      <ClientsForm func={createClient}/>
   )
}


export default CreateClient