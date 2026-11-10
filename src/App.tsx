import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
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
      <ToastContainer
        position='top-right'
        autoClose={300}
        theme='colored'
      />
    </BrowserRouter>
  )
}