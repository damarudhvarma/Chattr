import { useAppStore } from '@/stores'
import React from 'react'

const Profile = () => {
  const {userInfo}=useAppStore()
  return (
    <div>email:{userInfo.email}</div>
  )
}

export default Profile