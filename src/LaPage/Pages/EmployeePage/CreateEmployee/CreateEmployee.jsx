import React from 'react'
import { useMutation } from 'react-query';
import { queryClient } from '../../../../App';
import axios from 'axios';
import ClientsForm from '../../ClientsPage/ClientsForm/ClientsForm';
import { redirect } from 'react-router';
import { BASE_URL } from '../../../API/requests';
export async function action() {
   return redirect("..")
}
const CreateEmployee = () => {
   const createEmployee = useMutation((user) => {
      return axios.post(`${BASE_URL}/employee/info/new`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('employees')
      },
   });
  

   return (
      <ClientsForm func={createEmployee} role={'ROLE_EMPLOYEE'}/>
   )
}

export default CreateEmployee


