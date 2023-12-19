import { useEffect, useState } from "react";
import CardProduct from "./CardProduct"
import { useAppSelector } from "../../redux/hooks/hooks"
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { Order } from "../../types/cart/Order";
import Spinner from "../../spinner/Spinner";

type ParamsType = {
  search?: string,
  filter?: string
}

const Products = () => {

  const { products } = useAppSelector(state => state.products);
  const { filter, search } = useParams<ParamsType>();
  const [productsFilterBySearch, setProductsFilterBySearch] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);


  useEffect(() => {
    const getProductFilters = async ()  => {

      if (filter || search) {

        try {
          setIsLoading(true)
          const { data } = await axios<Order[]>(`http://localhost:4000/store/products/?filter=${filter}&name=${search}`);
          setIsLoading(false)
          setProductsFilterBySearch(data);

        }
        catch (error: unknown) {
          if (error instanceof AxiosError) {
            return error.response?.data
          }
        }
      }
    }
    getProductFilters()
  }, [filter, search])

  return (
    <>

      {isLoading ?
        <div className="bg-white h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div> : (
        <div className="w-full md:w-3/4 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {productsFilterBySearch.length > 0 ?
            productsFilterBySearch.map(product => {
              return (
                <CardProduct key={product.id} product={product} />
              )
            })
            : products.map((product) => {
              return (
                <CardProduct key={product.id} product={product} />
              )
            })}
        </div>
        )}

    </>
  )
}

export default Products