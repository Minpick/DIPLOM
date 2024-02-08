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

  }, {
    status: 'produce',
    name: 'Поставленные'
  }
]
const addLi = li[1]
  return (
    <DefaultPage
    li={li}
    addLi={addLi}
    statuses={statuses}
    >
      <TasksList 
      userRole={'ADMIN'}
      />
    </DefaultPage>
  )
}

export default TasksPage