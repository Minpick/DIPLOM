import React from 'react'
import style from './ClientsPage.module.scss'

const ClientsPage = () => {

  return (
      <div className={style.clients}>
      <ul className={style.clients__navbar_list}>
        <li className={style.clients__navbar_item}>Клиент</li>
        <li className={style.clients__navbar_item}>Сделка</li>
        <li className={style.clients__navbar_item}>Дата создания</li>
      </ul>
      <ul className={style.clients__list}>

      </ul>
      </div>

  )
}

export default ClientsPage