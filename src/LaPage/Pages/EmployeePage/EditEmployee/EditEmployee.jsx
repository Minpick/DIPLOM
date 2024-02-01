import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { redirect, useParams } from 'react-router'
import { BASE_URL, fetchEmployee } from '../../../API/requests'
import axios from 'axios'
import { queryClient } from '../../../../App'
import ClientsForm from '../../ClientsPage/ClientsForm/ClientsForm'
import Loading from '../../../UI/Loading/Loading'

export async function action() {
   return redirect("..")
}

const EditEmployee = () => {
 
   const { id } = useParams()
   const { data, isLoading} = useQuery({ queryKey: ['employee'], queryFn: () => fetchEmployee(id) })
   const editEmployee = useMutation((user) => {
      return axios.patch(`${BASE_URL}/employee/info/${id}`, user);
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
   return (
      <>
         <ClientsForm func={editEmployee} data = {data} role={'ROLE_EMPLOYEE'} isLoading={isLoading}/>
      </>
   )
  
}

export default EditEmployee