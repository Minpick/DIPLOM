import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom"
import LandingPage from './LandingPage/LandingPage'
import AuthPage from './AuthPage/AuthPage'

import Layout from './LaPage/Components/Layout/Layout'
import ClientsPage from './LaPage/Pages/ClientsPage/ClientsPage'
import EmployeePage from './LaPage/Pages/EmployeePage/EmployeePage'
import TasksPage from './LaPage/Pages/TasksPage/TasksPage'
import DealsPage from './LaPage/Pages/DealsPage/DealsPage'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Outlet/>}>
    <Route index element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />} />
    <Route path='lk' element={<div>LKPAge</div>}>
    </Route>
    <Route path='la' element={<Layout />} >
      <Route index element={<Navigate to='clients' replace />} />
      <Route path='clients' element={<ClientsPage />} />
      <Route path='employee' element={<EmployeePage/>} />
      <Route path='tasks' element={<TasksPage />} />
      <Route path='deals' element={<DealsPage />} />
    </Route>
  </Route>
),{basename:'/'})
function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
