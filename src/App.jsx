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
import EditClient, { action as EditClientAction } from './LaPage/Pages/ClientsPage/EditClient/EditClient'
import { QueryClient, QueryClientProvider } from 'react-query'
import CreateEmployee, { action as CreateEmployeeAction } from './LaPage/Pages/EmployeePage/CreateEmployee/CreateEmployee'
import EditEmployee, { action as EditEmployeeAction } from './LaPage/Pages/EmployeePage/EditEmployee/EditEmployee'
import RegPage, { action as RegPageAction } from './AuthPage/reg/RegPage'
import AuthPage from './AuthPage/AuthPage/AuthPage'
import LoginPage, { action as LoginPageAction } from './AuthPage/login/LoginPage'
import LkLayout from './LkPage/Components/LkLayout/LkLayout'
import ProgressPage from './LkPage/Pages/ProgressPage/ProgressPage'
import CreateTask, { action as CreateTaskAction } from './LaPage/Pages/TasksPage/CreateTask/CreateTask'
import EditTask, { action as EditTaskAction } from './LaPage/Pages/TasksPage/EditTask/EditTask'
import ChatPage from './LaPage/Pages/ChatPage/ChatPage'
import ChatWindow from './LaPage/Pages/ChatPage/ChatWindow/ChatWindow'
import DealPage from './LaPage/Pages/DealPage/DealPage'
import CreateDeal, { action as CreateDealAction } from './LaPage/Pages/DealPage/CreateDeal/CreateDeal'
import DealPayment,{action as DealPaymentAction} from './LaPage/Pages/DealPage/DealPayment/DealPayment'
import DealMail,{action as DealMailAction} from './LaPage/Pages/DealPage/DealMail/DealMail'
import DealProgress,{action as DealProgressAction} from './LaPage/Pages/DealPage/DealProgress/DealProgress'
import CalendarPage from './LaPage/Pages/CalendarPage/CalendarPage'
import DayInfo,{action as DayInfoAction} from './LaPage/Pages/CalendarPage/DayInfo/DayInfo'
import BiddingPage from './LaPage/Pages/BiddingPage/BiddingPage'
import CreateBidding, {action as CreateBiddingAction} from './LaPage/Pages/BiddingPage/CreateBidding/CreateBidding'
import EditBidding,{action as EditBiddingAction} from './LaPage/Pages/BiddingPage/EditBidding/EditBidding'
import ProfilePage from './LkPage/Pages/ProfilePage/ProfilePage'


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // keepPreviousData:false,
      refetchOnWindowFocus: false
    },
  },
})
const requireAuthEmployee = async () => {
  if (!localStorage.getItem('token')) {
    throw redirect('/auth/login')
  }
}
const requireAuthClient = async () => {
  if(localStorage.getItem('role')==='ROLE_CLIENT'){
    throw redirect('/lk')
  }
  if (!localStorage.getItem('token')) {
    throw redirect('/auth/login')
  }
}
const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Outlet />}>
    <Route index element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />}>
      <Route index element={<Navigate to='login' replace />} />
      <Route path='registration' element={<RegPage />} action={RegPageAction} />
      <Route path='login' element={<LoginPage />} action={LoginPageAction} />
    </Route>
    <Route path='lk' element={<LkLayout />} loader={async ()=> await requireAuthEmployee()}>
      <Route index element={<Navigate to='progress' replace />} />
      <Route path='progress' element={<ProgressPage />} />
      <Route path='chat' element={<div>chat</div>} />
      <Route path='biddings' element={<ProgressPage />} />
      <Route path='profile' element={<ProfilePage />} />
      <Route path='calendar' element={<div>docs</div>} />
      <Route path='payment' element={<div>payment</div>} />
    </Route>
    <Route path='la' element={<Layout />} loader={async () => await requireAuthClient()}>
      <Route index element={<Navigate to='clients?status=in_progress' replace />} />
      <Route path='clients' element={<ClientsPage />} >
        <Route path='new' action={CreateClientAction} element={<CreateClient />} />
        <Route path=':id/edit' action={EditClientAction} element={<EditClient />} />
        <Route path=':id/deal' element={<DealPage />}>
          <Route path='new' action={CreateDealAction} element={<CreateDeal />} />
          <Route path=':deal'>
            <Route index element={<Navigate to='progress' replace />} />
            <Route path='payment' action={DealPaymentAction} element={<DealPayment />} />
            <Route path='mail' action={DealMailAction} element={<DealMail />} />
            <Route path='progress' action={DealProgressAction} element={<DealProgress />} />
          </Route>
        </Route>
      </Route>

      <Route path='employee' element={<EmployeePage />} >
        <Route path='new' action={CreateEmployeeAction} element={<CreateEmployee />} />
        <Route path='edit/:id' action={EditEmployeeAction} element={<EditEmployee />} />
      </Route>

      <Route path='tasks' element={<TasksPage />} >
        <Route path='new'
          action={CreateTaskAction}
          element={<CreateTask />}
        />
        <Route path='edit/:id'
          action={EditTaskAction}
          element={<EditTask />}
        />
      </Route>
      <Route path='chat' element={<ChatPage />} >
        <Route path=':id' element={<ChatWindow />} />
      </Route>
      <Route  path='calendar' element={<CalendarPage/>}>
        <Route   path='info' element={<DayInfo/>} action={DayInfoAction}/>
      </Route>
      <Route path='bidding' element={<BiddingPage/>}>
      <Route path='new'
          action={CreateBiddingAction}
          element={<CreateBidding />}
        />
        <Route path='edit/:id'
          action={EditBiddingAction}
          element={<EditBidding />}
        />
      </Route>
    </Route>
  </Route>
), { basename: '/' })
function App() {

  return (
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
