import { useEffect, useState } from 'react'
import Products from './components/products/Products';
import DetailProduct from './components/products/DetailProduct';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/cart/Cart';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import { useAppDispatch } from './redux/hooks/hooks';
import { getUserProfileThunk, verifyTokenThunk } from './redux/thunks/AuthThunk';
import { getAllOrdersThunk } from './redux/thunks/CartThunks';
import { getProductsThunk } from './redux/thunks/ProductsThunk';
import NavBar from './components/navbar/NavBar';
import AdminPage from './pages/admin/AdminPage';
import FormPage from './pages/admin/FormPage';
import FormProduct from './components/admin/FormProduct';
import FormCategory from './components/admin/FormCategory';
import UserPage from './pages/profile/UserPage';
import CategoryPage from './pages/Category/CategoryPage';
//protected routes
import UserRouters from './private/UserRouters';


function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true);

  //get user profile
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(verifyTokenThunk())
      await dispatch(getUserProfileThunk());
      await dispatch(getProductsThunk())
      await dispatch(getAllOrdersThunk())
      setLoading(false);
    }
    fetchData()

  }, [dispatch]);


  return (
    <>

      <Routes>
        <Route element={<NavBar />}>
          <Route path='/' element={<Home />} />
          <Route path='/store/:filter?/:search?' element={<Products />} />
          <Route path='/store/*' element={<Products />} />
          <Route path='/detail/:id' element={<DetailProduct />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route element={<UserRouters loading={loading} />}>
            <Route path='/cart' element={<Cart />} />
          </Route>
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
        <Route element={<UserRouters loading={loading} />}>
          <Route path='/profile' element={<UserPage />} />

        </Route>

      </Routes>




    </>
  )
}

export default App
