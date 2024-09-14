import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom"
import Login from './components/Auth/Login.jsx'
import SignUp from './components/Auth/SignUp.jsx'

const Router = createBrowserRouter([
{
  path:"",
  element:<App/>,
  children:[
    {
      path:"/",
      element: <Navigate to ="/login"/>
    },
    {
      path:"/login",
      element:<Login/>
    },{
      path:"/signup",
      element:<SignUp/>
    }
  ]
}



])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router ={Router}/>
  </StrictMode>,
)
