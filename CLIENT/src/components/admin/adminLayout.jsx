import React from 'react'
import AdminHeader from './adminHeader'
import AdminSideBar from './adminSideBar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
    return (
        <div className='h-screen'>
            {/* admin Header */}
            <AdminHeader />
            {/* adminSideBar */}
            <div className='flex flex-row'>
                <AdminSideBar />
                <Outlet />
            </div>
        </div>
    )
}

export default AdminLayout