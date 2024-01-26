import React, { useEffect, useState } from 'react'
import { BASE_URL, fetchTasks } from '../../../API/requests'
import classNames from 'classnames'
import { Link, useSearchParams } from 'react-router-dom'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import PaginationBtns from '../../../UI/PaginationBtns/PaginationBtns'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../../../../App'
import axios from 'axios'
import style from './TasksList.module.scss'

const TasksList = () => {
   const [page, setPage] = useState(0)
   const [searchParams, setSearchParams] = useSearchParams()
   const status = searchParams.get('status')
   const { data } = useQuery({ queryKey: ['tasks', page, status], queryFn: () => fetchTasks(page, status) })
   useEffect(() => {
      queryClient.invalidateQueries('tasks');
   }, [status]);
   const deleteTask = useMutation((id) => {
      return axios.delete(`${BASE_URL}/task/${id}`);
   }, {
      onSuccess: () => {
         queryClient.invalidateQueries('tasks')
      },
   });
   const tasks = data?.data?.map(task => {
      return (
         <li key={task.id}
            className={classNames('clients__item')}>
            <Link to={`edit/${task.id}?${searchParams.toString()}`}
               className={classNames(style.clients__item, 'clients__item')}>
               <div className={style.clients__field}>
                  {task.name}
               </div>
               <div href="#" className={style.clients__field}>
                  {task.producer}
               </div>
               <div className={style.clients__field}>
                  {task.expiryDate}
               </div>
            </Link>
            <DeleteButton onClick={() => deleteTask.mutate(task.id)} />
         </li>
      )
   })
   return (
      <div className={style.list}>
         {tasks}
         <PaginationBtns page={page} setPage={setPage} />
      </div>
   )
}

export default TasksList