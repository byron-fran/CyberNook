import { Route, Routes } from "react-router-dom"
import NavBar from "../components/navbar/NavBar"
import Home from "../pages/home/Home"
import Products from "../components/products/Products"
import DetailProduct from "../components/products/DetailProduct"
import ProductsOferts from "../pages/products/ProductsOferts"
import SuccessPayment from "../pages/payment/SuccessPayment"
import CancelPayment from "../pages/payment/CancelPayment"
import UserRouters from "../private/UserRouters"
import Cart from "../components/cart/Cart"
import AdminRoutes from "../private/AdminRoutes"
import AdminPage from "../pages/admin/AdminPage"
import FormPage from "../pages/admin/FormPage"
import FormProduct from "../components/admin/FormProduct"
import FormSpecs from "../components/admin/FormSpecs"
import FormCategory from "../components/admin/FormCategory"
import OrdersPage from "../pages/admin/OrdersPage"
import UsersPage from "../pages/admin/UsersPage"
import ReviewsPage from "../pages/admin/ReviewsPage"
import ProductsPage from "../pages/admin/ProductsPage"
import Register from "../pages/auth/Register"
import Login from "../pages/auth/Login"
import UserPage from "../pages/profile/UserPage";


export const AppRoutes = () => {
   
    return (
        <Routes>
            <Route element={<NavBar />}>
                <Route path='/' element={<Home />} />
                <Route path='/store/?page=1' element={<Products />} />
                <Route path='/store/*' element={<Products />} />
                <Route path='/product/:id' element={<DetailProduct />} />
                <Route path='/category/*' element={<Products />} />
                <Route path='/oferts' element={<ProductsOferts />} />
                <Route path='/success-payment' element={<SuccessPayment />} />
                <Route path='/cancel-payment' element={<CancelPayment />} />
                <Route element={<UserRouters/>}>
                    <Route path='/cart' element={<Cart />} />
                </Route>
            </Route>

            {/* Routes Admin */}
            <Route element={<AdminRoutes  />}>
                <Route path='/admin' element={<AdminPage />} >
                    <Route index element={<FormPage />} />
                    <Route path='/admin/*' element={< FormPage />} />
                    <Route path='/admin/create-product' element={<FormProduct />} />
                    <Route path='/admin/create-specs/:ProductId' element={<FormSpecs />} />
                    <Route path='/admin/update-specs/:ProductId/:id' element={<FormSpecs />} />
                    <Route path='/admin/update-product/:id' element={<FormProduct />} />
                    <Route path='/admin/create-category' element={<FormCategory />} />
                    <Route path='/admin/orders' element={<OrdersPage />} />
                    <Route path='/admin/users' element={<UsersPage />} />
                    <Route path='/admin/reviews' element={<ReviewsPage />} />
                    <Route path='/admin/products' element={<ProductsPage />} />

                </Route>
            </Route>

            {/* Routes Auth */}

            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            {/* Routes User Profile */}
            <Route element={<UserRouters  />}>
                <Route path='/profile' element={<UserPage />} />

            </Route>
        </Routes>
    )
}