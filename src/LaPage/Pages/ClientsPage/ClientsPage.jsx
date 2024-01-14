import React from 'react'
import style from './ClientsPage.module.scss'
import ClientsList from './ClientsList/ClientsList'
import { Outlet } from 'react-router'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'

const ClientsPage = () => {

  return (
    <DefaultPage
      li1={'Клиент'}
      li2={'Телефон'}
      li3={'Почта'}
    >
      {<ClientsList />}

    </DefaultPage>

  )
}

export default ClientsPage