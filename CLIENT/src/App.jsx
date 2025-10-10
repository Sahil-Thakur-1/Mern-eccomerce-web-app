import './App.css'
import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import AdminLayout from './components/admin/adminLayout'
import DashBoard from './pages/admin/dashboard'
import Products from './pages/admin/products'
import Features from './pages/admin/features'
import ShopLayout from './components/shop/shopLayout'
import Account from './pages/shop/account'
import Checkout from './pages/shop/checkout'
import Home from './pages/shop/home'
import Listing from './pages/shop/listing'
import { CheckAuth } from './components/common/checkAuth'
import Orders from './pages/admin/orders'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { verifyUser } from './features/auth/authSlice'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import UnAuth from './pages/unAuth/unAuth'
import AddEditProduct from './pages/admin/addEditProduct'
import AddEditCategory from './pages/admin/addEditCategory'
import ModalContainer from './components/common/modal'
import Cart from './pages/shop/cart'
import ProductDetail from './pages/shop/productDetail'

function App() {
  let { isAuthenticated, user, isLoading } = useSelector(state => state.auth);
  const dispactch = useDispatch();

  useEffect(() => {
    dispactch(verifyUser());
  }, [dispactch]);

  return (<>
    <div className=''>
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user?.role} isLoading={isLoading}>
            </CheckAuth>
          }
        />
        <Route path='/auth' element={<CheckAuth isAuthenticated={isAuthenticated} user={user?.role} isLoading={isLoading}> <AuthLayout /> </ CheckAuth >}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route >
        <Route path='/admin' element={<CheckAuth isAuthenticated={isAuthenticated} user={user?.role} isLoading={isLoading}> <AdminLayout /> </CheckAuth>}>
          <Route path='dashboard' element={<DashBoard />} />
          <Route path='products' element={<Products />} />
          <Route path='products/add' element={<AddEditProduct />} />
          <Route path='products/edit/:id' element={<AddEditProduct />} />
          <Route path='category/add' element={<AddEditCategory />} />
          <Route path='orders' element={<Orders />} />
          <Route path='features' element={<Features />} />
        </Route>
        <Route path='/shop' element={<CheckAuth isAuthenticated={isAuthenticated} user={user?.role} isLoading={isLoading}> <ShopLayout /> </CheckAuth>}>
          <Route path='account' element={<Account />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='home' element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='product/:id' element={<ProductDetail />} />
          <Route path='products' element={<Listing />} />
        </Route>
        <Route path='/unAuth' element={<UnAuth />} />
      </Routes >

      <ModalContainer />
    </div >
  </>
  )
}

export default App
