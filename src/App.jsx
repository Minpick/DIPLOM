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

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Outlet/>}>
    <Route index element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />} />
    <Route path='lk' element={<div>LKPAge</div>}>
    </Route>
    <Route path='la' element={<Layout />} >
      <Route index element={<Navigate to='clients' replace />} />
      <Route path='clients' element={<ClientsPage />} />
    </Route>
  </Route>
),{basename:'/'})
function App() {

  return (
      <RouterProvider router={router} />
  )
}

export default App
