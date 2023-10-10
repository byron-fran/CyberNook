
import { useEffect , useState} from 'react'
import axios from 'axios';
import Products from './components/products/Products';

import './App.css';
import { PurchaseType } from './interface/Purchase';
// import Cart from './components/cart/Cart';
import DetailProduct from './components/products/DetailProduct';
import { Routes, Route } from 'react-router-dom';


function App() {
  const [productos, setProducts] = useState([]);
  const [cart, setCart] = useState<PurchaseType[]>([]);
  
  useEffect(() => {
    const getProducts = async () => {
      try{

        const url = `http://localhost:4000/store/products`;
        const {data} = await axios(url);
        setProducts(data);
       
        return data
      }
      catch(eror : unknown){
        console.log(eror)
      }
    }
    getProducts()
  }, [])
 // console.log(productos);
  return (
    <>
      <h1>Hola desde typescript</h1>
      {/* {productos.length > 0  && <Products productos={productos}/>} */}
    
      <Routes>
        <Route path='/store'  element={<Products productos={productos}/>}/>
        <Route path='/detail/:id' element={<DetailProduct cart={cart} setCart={setCart}/>}/>
      </Routes>
    </>
  )
}

export default App
