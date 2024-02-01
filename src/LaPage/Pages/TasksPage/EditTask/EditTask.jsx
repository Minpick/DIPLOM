import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { redirect, useParams } from 'react-router'
import { BASE_URL, fetchTask } from '../../../API/requests'
import { queryClient } from '../../../../App'
import axios from 'axios'
import Loading from '../../../UI/Loading/Loading'
import TaskForm from '../TaskForm/TaskForm'
export async function action({ request }) {
   const searchParams = new URL(request.url)
      .searchParams.toString()
   return redirect(`..?${searchParams}`)
}
const EditTask = () => {
   const { id } = useParams()
   const { data, isLoading } = useQuery({ queryKey: ['task'], queryFn: () => fetchTask(id) })
   const editTask = useMutation((task) => {
      return axios.patch(`${BASE_URL}/task/${id}`, task);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('tasks')
      },
   });
   
   if (isLoading) {
      return (
         <Loading />
      )
   }
   return (
      <>
         <TaskForm func={editTask}
            isLoading={isLoading}
            data={data}
         />
      </>
   )
}

export default EditTask