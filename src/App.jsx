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
import CreateClient, { action as CreateClientAction } from './LaPage/Pages/ClientsPage/CreateClient/CreateClient'
import EditClient,{ action as EditClientAction }  from './LaPage/Pages/ClientsPage/EditClient/EditClient'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreateEmployee,{action as CreateEmployeeAction} from './LaPage/Pages/EmployeePage/CreateEmployee/CreateEmployee'
import EditEmployee,{action as EditEmployeeAction} from './LaPage/Pages/EmployeePage/EditEmployee/EditEmployee'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData:true,
      refetchOnWindowFocus:false
    },
  },
})
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Outlet/>}>
    <Route index element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />} />
    <Route path='lk' element={<div>LKPAge</div>}>
    </Route>
    <Route path='la' element={<Layout />} >
      <Route index element={<Navigate to='clients' replace />} />
      <Route path='clients' element={<ClientsPage />} >
        <Route path='new' action={CreateClientAction} element={<CreateClient/>}/>
        <Route path='edit/:id' action={EditClientAction} element={<EditClient/>}/>
      </Route>

      <Route path='employee' element={<EmployeePage/>} >
      <Route path='new' action={CreateEmployeeAction} element={<CreateEmployee/>}/>
      <Route path='edit/:id' action={EditEmployeeAction} element={<EditEmployee/>}/>
      </Route>
      <Route path='tasks' element={<TasksPage />} />
      <Route path='deals' element={<DealsPage />} />
    </Route>
  </Route>
),{basename:'/'})
function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
