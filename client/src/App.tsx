import { useEffect } from 'react'
import Products from './components/products/Products';
import DetailProduct from './components/products/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import {  useAppDispatch } from './redux/hooks/hooks';
import { getUserProfileThunk, verifyTokenThunk } from './redux/thunks/AuthThunk';
import { getProductsThunk } from './redux/thunks/ProductsThunk';
import NavBar from './components/navbar/NavBar';
import AdminPage from './pages/admin/AdminPage';
import FormPage from './pages/admin/FormPage';
import FormProduct from './components/admin/FormProduct';
import FormCategory from './components/admin/FormCategory';
import UserPage from './pages/profile/UserPage';
import CategoryPage from './pages/Category/CategoryPage';

function App(): JSX.Element {
  const dispatch = useAppDispatch()
  
  //get user profile
  useEffect(() => {


    dispatch(verifyTokenThunk())
    dispatch(getUserProfileThunk());
    dispatch(getProductsThunk())

  }, []);


  return (
    <>

      <Routes>
        <Route element={<NavBar />}>
          <Route path='/' element={<Home />} />
          <Route path='/store/:filter?/:search?' element={<Products />} />
          <Route path='/store/*' element={<Products />} />
          <Route path='/detail/:id' element={<DetailProduct />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/category/:category' element={<CategoryPage/>}/>
        </Route>

      {/* Routes Admin */}
        <Route path='/admin' element={<AdminPage />} >
          <Route index element={<FormPage />} />
          <Route path='/admin/create-product' element={<FormProduct />} />
          <Route path='/admin/create-category' element={<FormCategory />} />
        </Route>
        {/* Routes Auth */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
          {/* Routes User Profile */}
          <Route path='/profile' element={<UserPage/>}/>
        
      </Routes>

    
      

    </>
  )
}

export default App
