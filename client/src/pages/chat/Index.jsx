import { useAppStore } from '@/stores'
import {React,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './components/contacts-container';
import EmptyChatContainer from './components/empty-chat-containers';
import ChatContainer from './components/chat-containers';

const chat = () => {
  const {
    userInfo,
    SelectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,}= useAppStore();

  const naviagte = useNavigate();
  useEffect(() => {
    
    if(!userInfo.ProfileSetup){
      toast("please set up your profile")
      naviagte('/profile')
    }
  
  }, [userInfo,naviagte])
  

  return (
    <div className='flex h-[100vh] text-white overflow-hidden'>

      {
        isUploading && (
      <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg '>
  <h5 className='text-5xl animate-pulse '>Uploading File</h5>
  {fileUploadProgress}%
      </div>

        )
      }
      {
        isDownloading && (
      <div className='h-[100vh] w-[100vw] fixed top-0 z-10 left-0 bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg '>
  <h5 className='text-5xl animate-pulse '>Downloading File</h5>
  {fileDownloadProgress}%
      </div>

        )
      }
    <ContactsContainer/>
    {
      SelectedChatType=== undefined ? <EmptyChatContainer/> : <ChatContainer/>
    }
    
    </div>
  )
}

export default chat