import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import Chat from './pages/chat/Index'
import Auth from './pages/auth/Index'
import Profile from './pages/profile/Index'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={<Auth />}/>
        <Route path='/chat' element={<Chat />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path= "*" element={<Navigate  to="/auth" />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
