import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
    return (
        <div className='grid grid-cols-2 min-h-screen min-w-screen'>
            <div className='flex flex-row justify-center items-center bg-black'>
                <h2 className='font-bold text-2xl text-white'>Welcome to the cosBox</h2>
            </div>
            <div className='flex flex-row justify-center items-center'>
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout