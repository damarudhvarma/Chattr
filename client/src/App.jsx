import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Chat from './pages/chat/Index'
import Auth from './pages/auth/Index'
import Profile from './pages/profile/Index'
import {  useState,useEffect,children } from 'react'
import { useAppStore } from './stores'
import { apiClinet } from './lib/api-clinet'
import { GET_USER_INFO } from './utils/constants'

const PrivateRoute =({children})=>{
 const {userInfo}=useAppStore();
 const isAuthenticated =!!userInfo;
 return  isAuthenticated ? children : <Navigate to="/auth" />
}  
const AuthRoute=({children})=>{ 
 const {userInfo}=useAppStore();
 const isAuthenticated =!!userInfo;
 return  isAuthenticated ?  <Navigate to="/chat" /> : children;
}  
function App() {
 const {userInfo,setUserInfo}=useAppStore();
 const [Loading, setLoading] = useState(true)
  
useEffect(()=>{
 const getUserData= async()=>{
  try {
    const response=await apiClinet.get(GET_USER_INFO,{withCredentials:true})
    if(response.status===200&& response.data.id){
      setUserInfo(response.data)
    }
    else{
      setUserInfo(undefined)
    }
    

  } catch (error) {
    setUserInfo(undefined)
  }
  finally{
    setLoading(false)
  }


 }
 if(!userInfo){
  getUserData();
 }else{
  setLoading(false);
 }


},[userInfo,setUserInfo])

if(Loading){
  return <div>Loading...</div>
}


 return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/auth' element={
          <AuthRoute>
               <Auth />
          </AuthRoute>
          }/>

        <Route path='/chat' element={
          <PrivateRoute>
          <Chat />
          </PrivateRoute>
        }/>

        <Route path='/profile' element={
          <PrivateRoute>

          <Profile />
          </PrivateRoute>
          }/>
        <Route path= "*" element={<Navigate  to="/auth" />}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
