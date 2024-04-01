import { useEffect, useState } from "react";
import CardProduct from "./CardProduct"
import { useAppSelector } from "../../redux/hooks/hooks"
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Spinner from "../../spinner/Spinner";
import { ProductType } from "../../interface/Product";
import { Order } from "../../types/cart/Order";
type ParamsType = {
  category?: string,
  name?: string,
  filter?: string,
  page? : string
}

const Products = () => {

  const { products } = useAppSelector(state => state.products);
  const { filter, category, name, page } = useParams<ParamsType>();
  const [productsFilterBySearch, setProductsFilterBySearch] = useState<ProductType[]>([]);
  const [productFilterByName, setProductFilterByName] = useState<Order>({} as Order);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const getProductFilters = async () => {

      if (filter || category || name) {
       
        try {

          setIsLoading(true)
          const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/store/products/?category=${category}&name=${name}&filter=${filter}`);
          setIsLoading(false);
         // console.log(data.product)
          setProductFilterByName(data.product)
          setProductsFilterBySearch(data.products.filter((product: ProductType) => Number(product.id) !== Number(data.product.id)));

        }
        catch (error: unknown) {
          if (error instanceof AxiosError) {
            return error.response?.data
          }
        }
      }
    }
    getProductFilters()
  }, [name, filter, category]);


  return (
    <>
      {productsFilterBySearch.length > 0 && (<p className="text-center font-bold mt-4">Search results</p>)}
      {isLoading ?
        <div className="bg-white h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div> : (
          <div className="w-full md:w-3/4 mx-auto grid  gap-4 mt-8">
            {productFilterByName && Object.values(productFilterByName).length > 0  && <CardProduct product={productFilterByName} /> }
            {productsFilterBySearch.length > 0 ?
              productsFilterBySearch.filter(product => product.id !== productFilterByName.id ?  productFilterByName.id : '' ).map(product => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })
              :
              products.map((product) => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })
              }

          </div>
        )}
    </>
  )
}

export default Products