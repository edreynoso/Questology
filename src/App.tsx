import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './App.css'
import Layout from './components/_layout'
import Communities from './pages/communities'
import Login from './pages/login'
import RequireAuth from './components/requireAuth'
import NotFound from './pages/notFound'
import CommunityQuests from './pages/community-quests'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/' element={<Layout/>}>
        <Route element={<RequireAuth/>}>
          <Route index element={<Navigate to='/communities' replace/>}/>
          <Route path='communities' element={<Communities/>}/>
          <Route path='communities/:communityId' element={<CommunityQuests/>}/>
        </Route>
        <Route path='404' element={<NotFound/>}/>
      </Route>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
  )
}

export default function App() {

  return (
    <BrowserRouter>
      <AppRoutes/>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        theme='colored'
      />
    </BrowserRouter>
  )
}