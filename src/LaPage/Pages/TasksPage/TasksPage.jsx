import React from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import TasksList from './TasksList/TasksList'


export const userRole = 'ADMIN'


const TasksPage = () => {
  const li = ['Задача','Постановщик','Крайний срок']
  const statuses = [{
    status: 'in_progress',
    name: 'В работе'
  }, {
    status: 'completed',
    name: 'Завершенные'

  }, {
    status: 'produce',
    name: 'Поставленные'
  }
]

  return (
    <DefaultPage
    li={li}
    statuses={statuses}
    >
      <TasksList 
      userRole={userRole}
      />
    </DefaultPage>
  )
}

export default TasksPage