import React from 'react'

import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import EmployeeList from './EmployeeList/EmployeeList'

const EmployeePage = () => {
  return (
    <DefaultPage
    li1={'Сотрудник'}
    li2={'Телефон'}
    li3={'Почта'}
    >
      <EmployeeList/>
    </DefaultPage>

  )
}

export default EmployeePage