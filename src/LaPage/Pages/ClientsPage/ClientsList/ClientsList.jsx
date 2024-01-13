import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchClients } from '../../../API/requests'
import style from './ClientsList.module.scss'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'
import classNames from 'classnames'

const ClientsList = () => {
   const { data } = useQuery({ queryKey: ['clients'], queryFn: fetchClients })
   const [isHover, setIsHover] = useState(false)

   const clients = data?.data?.map(client => {
      return (
         <li
            key={client.email} className={classNames(style.clients__item,'clients__item')}>
            <a href="#" className={style.clients__name}
            // onClick={(event) => onClickEdit(event, client.id)}
            >
               Egor
            </a>
            <a href="#" className={style.clients__deal}>

               {client.email}
            </a>
            <div className={style.clients__createdAt}>
               {client.phone}
            </div>
            <DeleteButton />
         </li>
      )
   })
   return (
      <div className={style.list}>
         {clients}
      </div>
   )
}

export default ClientsList