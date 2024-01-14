import React, { useEffect, useState } from 'react'
import PopUpAdd from '../../../UI/PopUpAdd/PopUpAdd'
import { Await, Form, defer, redirect, useLoaderData, useParams, useSearchParams } from 'react-router-dom'
import { BASE_URL, fetchClient } from '../../../API/requests'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { queryClient } from '../../../../App'
import ClientsForm from '../ClientsForm/ClientsForm'

export async function action() {
   return redirect("..")
}

const EditClient = () => {
   const { id } = useParams()
   const { data, isLoading} = useQuery({ queryKey: ['client'], queryFn: () => fetchClient(id) })
   const editClient = useMutation((user) => {
      return axios.patch(`${BASE_URL}/clients/${id}`, user);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('clients')
      },
   });
   if (isLoading) return <div>Loading...</div>
   return (
      <>
         <ClientsForm func={editClient} data = {data}/>
      </>
   )
}


export default EditClient