import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import LandingPage from './LandingPage/LandingPage'
import AuthPage from './AuthPage/AuthPage'
import LkPage from './LkPage/LkPage'
import LaPage from './LaPage/LaPage'

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='' element={<LandingPage />} />
    <Route path='auth' element={<AuthPage />} />
    <Route path='lk' element={<LkPage/>}/>
    <Route path='la' element={<LaPage/>}/>
  </>


))
function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
