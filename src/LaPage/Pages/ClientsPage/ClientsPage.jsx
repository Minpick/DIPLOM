import React from 'react'
import style from './ClientsPage.module.scss'
import ClientsList from './ClientsList/ClientsList'
import { Outlet } from 'react-router'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'

const ClientsPage = () => {


  const statuses = [{
    status: 'in_progress',
    name: 'В работе'
  }, {
    status: 'planned',
    name: 'Планируемые'
  }, {
    status: 'completed',
    name: 'Завершенные'
  }
]
const li = ['Клиент','Телефон','Почта']
return (
  <DefaultPage
    li1={'Клиент'}
    li2={'Телефон'}
    li3={'Почта'}
    li={li}
    statuses={statuses}
  // statusesName={statusesName}
  >
    {<ClientsList />}

  </DefaultPage>

)
}

export default ClientsPage