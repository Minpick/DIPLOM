import React from 'react'

import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import EmployeeList from './EmployeeList/EmployeeList'

const EmployeePage = () => {

  const li = ['Сотрудник','Телефон','Почта']
  return (
    <DefaultPage
    li={li}
    >
      <EmployeeList/>
    </DefaultPage>

  )
}

export default EmployeePage