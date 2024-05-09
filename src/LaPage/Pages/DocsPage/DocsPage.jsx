import React from 'react'
import DefaultPage from '../../Components/DefaultPage/DefaultPage'
import TemplateList from './TemplateList/TemplateList'
import { Outlet } from 'react-router'

const DocsPage = () => {
  return (
    <DefaultPage li={[]}>
      <TemplateList/>
    </DefaultPage>
  )
}

export default DocsPage