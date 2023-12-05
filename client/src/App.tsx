
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

function App() : JSX.Element {
  const [productos, setProducts] = useState([]);


  useEffect(() => {
    const getProducts = async () => {
      try {

        const url = `http://localhost:4000/store/products`;
        const { data } = await axios(url);
        setProducts(data);
        console.log(data)
        return data
      }
      catch (eror: unknown) {
        console.log(eror)
      }
    }
    getProducts()
  }, [])
  // console.log(productos);
  return (
    <>
      <CartProvider>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/store' element={<Products productos={productos} />} />
          <Route path='/detail/:id' element={<DetailProduct  />} />
          <Route path='/cart' element={<Cart/>}/>
          {/* Auth */}
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </CartProvider>

    </>
  )
}

export default App
