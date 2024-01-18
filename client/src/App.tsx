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
import { getAllReviewsThunk } from './redux/thunks/ReviewsThunk';
import NavBar from './components/navbar/NavBar';
import AdminPage from './pages/admin/AdminPage';
import UserPage from './pages/profile/UserPage';
import CategoryPage from './pages/Category/CategoryPage';
import MarkPage from './pages/Mark/MarkPage';
//protected routes
import UserRouters from './private/UserRouters';
import CancelPayment from './components/cart/CancelPayment';
import SuccessPayment from './components/cart/SuccessPayment';
//Admin Page
import FormProduct from './components/admin/FormProduct';
import FormCategory from './components/admin/FormCategory';
import FormPage from './pages/admin/FormPage';
import UsersPage from './pages/admin/UsersPage';
import ReviewsPage from './pages/admin/ReviewsPage';
import OrdersPage from './pages/admin/OrdersPage';
import ProductsPage from './pages/admin/ProductsPage';
import SalesPage from './pages/admin/SalesPage';
import CuponsPage from './pages/admin/CuponsPage';
import AdminRoutes from './private/AdminRoutes';
import ProductsOferts from './pages/products/ProductsOferts';

import { getAllOrdersByAdmin } from './redux/thunks/OrdersThunks';
import { getAllUsers } from './redux/thunks/UsersThunk';
import { getListCategories } from './redux/thunks/CategoryThunks';
import { getAllMarks } from './redux/thunks/MarksThunk';

function App(): JSX.Element {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState<boolean>(true);

  //get user profile
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch(verifyTokenThunk())
      dispatch(getUserProfileThunk());
      dispatch(getProductsThunk())
      dispatch(getAllOrdersThunk())
      dispatch(getAllOrdersByAdmin())
      dispatch(getAllUsers());
      dispatch(getAllReviewsThunk())
      dispatch(getListCategories());
      dispatch(getAllMarks())
      setLoading(false);


    }
    fetchData()

  }, [dispatch]);


  return (
    <>

      <Routes>
        <Route element={<NavBar />}>
          <Route path='/' element={<Home />} />
          <Route path='/store/:category?/:name?/:filter?' element={<Products />} />
          <Route path='/store/*' element={<Products />} />
          <Route path='/detail/:id' element={<DetailProduct />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/mark/:mark' element={<MarkPage />} />
          <Route path='/oferts' element={<ProductsOferts />} />
          <Route path='/success-payment' element={<SuccessPayment />} />
           <Route path='/cancel-payment' element={<CancelPayment />} />
          <Route element={<UserRouters loading={loading} />}>
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Route>

        {/* Routes Admin */}
        <Route element={<AdminRoutes loading={loading} />}>
          <Route path='/admin' element={<AdminPage />} >
            <Route index element={<FormPage />} />
            <Route path='/admin/*' element={< FormPage />} />
            <Route path='/admin/create-product' element={<FormProduct />} />
            <Route path='/admin/update-product/:id' element={<FormProduct />} />
            <Route path='/admin/create-category' element={<FormCategory />} />
            <Route path='/admin/orders' element={<OrdersPage />} />
            <Route path='/admin/users' element={<UsersPage />} />
            <Route path='/admin/reviews' element={<ReviewsPage />} />
            <Route path='/admin/products' element={<ProductsPage />} />
            <Route path='/admin/sales' element={<SalesPage />} />
            <Route path='/admin/cupons' element={<CuponsPage />} />
          </Route>
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
