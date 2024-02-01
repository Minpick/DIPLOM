import React, { useState } from 'react'
import { queryClient } from '../../../../App';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { BASE_URL, fetchRecipients } from '../../../API/requests';
import TaskForm from '../TaskForm/TaskForm';
import { redirect } from 'react-router';


export async function action({request}) {
   const searchParams = new URL(request.url)
   .searchParams.toString()
   return redirect(`..?${searchParams}`)
}

const CreateTask = () => {
   const createTask = useMutation((task) => {
      return axios.post(`${BASE_URL}/task/new`, task);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('tasks')
      },
   });

   const { data } = useQuery({ queryKey: ['recipients'], queryFn: fetchRecipients })
   const recipients = data?.data
   return (
      <TaskForm func={createTask} 
      recipients={recipients}/>
   )
}

export default CreateTask