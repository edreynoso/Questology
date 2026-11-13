import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Login from './pages/login'
import './App.css'

function AppRoutes() {
  // Future pages/ route logic
  return (
    <>
    </>
  )
}

export default function App() {

  return (
    <BrowserRouter>
      <AppRoutes/>
      <Login />
      <ToastContainer />
    </BrowserRouter>
  )
}