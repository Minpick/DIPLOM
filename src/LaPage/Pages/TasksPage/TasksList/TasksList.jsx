import React, { useEffect, useState } from 'react'
import { BASE_URL, fetchAdminTasks, fetchTasks } from '../../../API/requests'
import classNames from 'classnames'
import { Link, useSearchParams } from 'react-router-dom'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import PaginationBtns from '../../../UI/PaginationBtns/PaginationBtns'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '../../../../App'
import axios from 'axios'
import style from './TasksList.module.scss'
import moment from "moment";
import Loading from '../../../UI/Loading/Loading'

const TasksList = ({userRole}) => {
   const [page, setPage] = useState(0)
   const [searchParams, setSearchParams] = useSearchParams()
   const status = searchParams.get('status')

   if(userRole=='ADMIN'){
      const id= searchParams.get('recipientId')
      var { data,isLoading } = useQuery({ queryKey: ['tasks', page, status,id], queryFn: () => fetchAdminTasks(page, status,id) })
   }else{
      var { data,isLoading } = useQuery({ queryKey: ['tasks', page, status], queryFn: () => fetchTasks(page, status) })
   }
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
   if (isLoading) {
      return (
         <Loading />
      )
   }
   const tasks = data?.data?.map(task => {
      return (
         <li key={task.id}
            className={classNames('clients__item')}>
            <Link to={`edit/${task.id}?${searchParams.toString()}`}
               className={classNames(style.clients__item, 'clients__item',task.status==='EXPIRED'?style.expired:task.status=='COMPLETED'?style.completed:'')}>
               <div className={style.clients__field}>
                  {task.name}
               </div>
               <div href="#" className={style.clients__field}>
                  {task.producer}
               </div>
               <div className={style.clients__field}>
                  {moment(task.expiryDate).format('DD.MM.YYYY')}
               </div>
            </Link>
            {/* {status == 'completed' &&  */}
            <DeleteButton onClick={() => deleteTask.mutate(task.id)} />
            {/* // } */}
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