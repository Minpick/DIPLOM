import React from 'react'
import style from './ClientsPage.module.scss'
import ClientsList from './ClientsList/ClientsList'
import PopUpAdd from '../../UI/PopUpAdd/PopUpAdd'

const ClientsPage = () => {

  return (
    <div className={style.clients}>
      <PopUpAdd/>
      <ul className={style.clients__navbar_list}>
        <li className={style.clients__navbar_item}>Клиент</li>
        <li className={style.clients__navbar_item}>Сделка</li>
        <li className={style.clients__navbar_item}>Дата создания</li>
      </ul>
      <ul className={style.clients__list}>
        <ClientsList />
      </ul>
    </div>

  )
}

export default ClientsPage