import React from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import TasksList from './TasksList/TasksList'

const TasksPage = () => {
  const li = ['Задача','Постановщик','Крайний срок']
  const statuses = [{
    status: 'in_progress',
    name: 'В работе'
  }, {
    status: 'completed',
    name: 'Завершенные'
  }
]
  return (
    <DefaultPage
    li={li}
    statuses={statuses}
    >
      <TasksList 
      userRole={'ADMIN'}
      />
    </DefaultPage>
  )
}

export default TasksPage