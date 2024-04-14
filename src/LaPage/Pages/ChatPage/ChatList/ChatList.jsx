import React, { useState } from 'react'
import { Outlet } from 'react-router'
import style from './ChatList.module.scss'
import { useQuery } from 'react-query'
import { fetchClients } from '../../../API/requests'
import { Link } from 'react-router-dom'
import Loading from '../../../UI/Loading/Loading'

const ChatList = () => {
   const pageSize = 30
   const { data, isLoading } = useQuery({ queryKey: ['clients'], queryFn: () => fetchClients(0,'in_progress',1000) })
   if (isLoading) {
      return (<div className={style.page}>
       <Loading />
      </div>)
   }
   const clients = data?.data.map((client) => {
      return (
         <Link className={style.item} key={client.id} to={`${client.id}`}>{client.lastName} {client.firstName}</Link>
      )
   })
   return (
      <div className={style.page}>
         <div className={style.sidebar}>{clients}</div>
         <Outlet />
      </div>
   )
}

export default ChatList