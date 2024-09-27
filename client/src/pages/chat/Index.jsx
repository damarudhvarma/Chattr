import { useAppStore } from '@/stores'
import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-containers';
import ChatContainer from './components/chat-containers';

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
    <div className='flex h-[100vh] text-white overflow-hidden'>
    <ContactsContainer/>
    {/* <EmptyChatContainer/> */}
    {/* <ChatContainer/> */}
    </div>
  )
}

export default chat