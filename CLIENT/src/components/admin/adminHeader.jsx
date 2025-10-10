import React from 'react'
import { Signal, CircleUser } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice';

const AdminHeader = () => {
    const dispactch = useDispatch();
    return (
        <div onClick={() => dispactch(logout())} className='flex flex-row bg-gray-700 h-16 px-4 justify-between'>
            <div className='flex flex-row gap-2 items-center justify-center text-white font-bold text-2xl '>
                <Signal className=' h-8 w-8 ' />
                Admin Panel
            </div>
            <div className='flex flex-row gap-2 items-center justify-center text-white text-lg'>
                <CircleUser />
                Admin
            </div>
        </div>
    )
}

export default AdminHeader
