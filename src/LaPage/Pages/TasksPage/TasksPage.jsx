import React from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import TasksList from './TasksList/TasksList'

const TasksPage = () => {
  return (
    <DefaultPage
    li1={'Задача'}
    li2={'Постановщик'}
    li3={'Крайний срок'}
    >
      <TasksList/>
    </DefaultPage>
  )
}

export default TasksPage