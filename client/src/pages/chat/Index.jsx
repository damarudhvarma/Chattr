import { useAppStore } from '@/stores'
import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const chat = () => {
  const {userInfo}= useAppStore();
  const naviagte = useNavigate();
  useEffect(() => {
    
    if(!userInfo.ProfileSetup){
      toast("please set up your profile")
      naviagte('/profile')
    }
  
  }, [userInfo,naviagte])
  

  return (
    <div>chat</div>
  )
}

export default chat