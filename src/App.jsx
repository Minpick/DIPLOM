import './App.css'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom"
import LandingPage from './LandingPage/LandingPage'

const router = createBrowserRouter(createRoutesFromElements(
<Route path='' element={<LandingPage/>} />
))
function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
