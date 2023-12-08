
import { useEffect, useState } from 'react'
import axios from 'axios';
import Products from './components/products/Products';
import { CartProvider } from './context/CartContext';
import DetailProduct from './components/products/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import { useAppSelector, useAppDispatch } from './redux/hooks/hooks';
import { getUserProfileThunk, verifyTokenThunk } from './redux/thunks/AuthThunk';
import { getProductsThunk } from './redux/thunks/ProductsThunk';
import Cookies from 'js-cookie'


function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth);
  //get user profile
  useEffect(() => {

    dispatch(verifyTokenThunk())
    dispatch(getUserProfileThunk());
    dispatch(getProductsThunk())

  }, []);


  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Products />} />
          <Route path='/detail/:id' element={<DetailProduct />} />
          <Route path='/cart' element={<Cart />} />
          {/* Auth */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </CartProvider>

    </>
  )
}

export default App
