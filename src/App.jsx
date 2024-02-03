import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet,
  redirect,
} from "react-router-dom"
import LandingPage from './LandingPage/LandingPage'


import Layout from './LaPage/Components/Layout/Layout'
import ClientsPage from './LaPage/Pages/ClientsPage/ClientsPage'
import EmployeePage from './LaPage/Pages/EmployeePage/EmployeePage'
import TasksPage from './LaPage/Pages/TasksPage/TasksPage'
import CreateClient, { action as CreateClientAction } from './LaPage/Pages/ClientsPage/CreateClient/CreateClient'
import EditClient,{ action as EditClientAction }  from './LaPage/Pages/ClientsPage/EditClient/EditClient'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreateEmployee,{action as CreateEmployeeAction} from './LaPage/Pages/EmployeePage/CreateEmployee/CreateEmployee'
import EditEmployee,{action as EditEmployeeAction} from './LaPage/Pages/EmployeePage/EditEmployee/EditEmployee'
import RegPage,{action as RegPageAction} from './AuthPage/reg/RegPage'
import AuthPage from './AuthPage/AuthPage/AuthPage'
import LoginPage,{action as LoginPageAction} from './AuthPage/login/LoginPage'
import LkLayout from './LkPage/Components/LkLayout/LkLayout'
import ProgressPage from './LkPage/Pages/ProgressPage/ProgressPage'
import CreateTask,{action as CreateTaskAction} from './LaPage/Pages/TasksPage/CreateTask/CreateTask'
import EditTask,{action as EditTaskAction} from './LaPage/Pages/TasksPage/EditTask/EditTask'
import ChatPage from './LaPage/Pages/ChatPage/ChatPage'
import ChatWindow from './LaPage/Pages/ChatPage/ChatWindow/ChatWindow'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // keepPreviousData:false,
      refetchOnWindowFocus:false
    },
  },
})
const  requireAuth = async ()=>{
  if(!localStorage.getItem('token')){
    throw redirect('/auth/login')
  }
}
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Outlet/>}>
    <Route index element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />}>
    <Route index element={<Navigate to='login' replace />} />
    <Route path='registration' element={<RegPage />} action={RegPageAction}/>
    <Route path='login' element={<LoginPage />} action={LoginPageAction} />
    </Route>
    <Route path='lk' element={<LkLayout/>}>
    <Route index element={<Navigate to='progress' replace />} />
      <Route path='progress' element={<ProgressPage/>}/>
      <Route path='chat' element={<div>chat</div>}/>
      <Route path='docs' element={<div>docs</div>}/>
      <Route path='payment' element={<div>payment</div>}/>
    </Route>
    <Route path='la' element={<Layout />}   loader={async () => await requireAuth()}>
      <Route index element={<Navigate to='clients?status=in_progress' replace />} />
      <Route path='clients' element={<ClientsPage />} >
        <Route path='new' action={CreateClientAction}  element={<CreateClient/>}/>
        <Route path='edit/:id' action={EditClientAction} element={<EditClient/>}/>
      </Route>

      <Route path='employee' element={<EmployeePage/>} >
      <Route path='new' action={CreateEmployeeAction} element={<CreateEmployee/>}/>
      <Route path='edit/:id' action={EditEmployeeAction} element={<EditEmployee/>}/>
      </Route>

      <Route path='tasks' element={<TasksPage />} >
      <Route path='new'
       action={CreateTaskAction}
       element={<CreateTask/>}
       />
      <Route path='edit/:id' 
      action={EditTaskAction}
       element={<EditTask/>}
       />
      </Route>
      <Route path='chat' element={<ChatPage />} >
        <Route path=':id' element={<ChatWindow/>}/>
      </Route>
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
