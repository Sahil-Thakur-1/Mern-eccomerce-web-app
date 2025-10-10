import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './shopHeader'
import Footer from '../common/footer'

const ShopLayout = () => {
    return (
        <div className=''>
            <ShopHeader />
            <Outlet />
            <Footer />
        </div>
    )
}

export default ShopLayout