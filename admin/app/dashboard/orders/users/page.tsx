import { Input } from '@/components/ui/input'
import UsersTable from '@/components/users/users-table'
import React from 'react'

const UsersPage = () => {
  return (
    <div className='p-3 md:p-5'>
        <div className="flex justify-end">
            <div className="">
                <Input type="text" placeholder="Search..." />
            </div>
        </div>
        <UsersTable/>
    </div>
  )
}

export default UsersPage