"use client"
import UserEdit from '@/components/user/user-edit'
import UserProfile from '@/components/user/user-profile'
import React, { useState } from 'react'

const UserPage = () => {
  const [edit, setedit] = useState<boolean>(false)
  return (
    <div>
      <UserProfile setEditOpen={setedit}/>
      <UserEdit open={edit} onToggle={setedit}/>
    </div>
  )
}

export default UserPage