import { useEffect, useState } from "react";
import CardProduct from "./CardProduct"
import { useAppSelector } from "../../redux/hooks/hooks"
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Spinner from "../../spinner/Spinner";
import { ProductType } from "../../interface/Product";
import UsePagination from "../../hooks/UsePagination";
import ListButtons from "../buttons/ListButtons";

type ParamsType = {
  category?: string,
  name?: string,
  filter?: string
}

const Products = () => {

  const { products } = useAppSelector(state => state.products);
  const { filter, category, name } = useParams<ParamsType>();
  const [productsFilterBySearch, setProductsFilterBySearch] = useState<ProductType[]>([]);
  const [productFilterByName, setProductFilterByName] = useState({} as ProductType);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    currentPage,
    pageButtons,
    totalPages,
    setCurrentPage,
    productsPerPage } = UsePagination(products, 10);

  useEffect(() => {
    const getProductFilters = async () => {

      if (filter || category || filter) {
        try {

          setIsLoading(true)
          const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/store/products/?category=${category}&name=${name}&filter=${filter}`);
          setIsLoading(false);

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
  }, [filter, category, name])

  return (
    <>
      {productsFilterBySearch.length > 0 && (<p className="text-center font-bold mt-4">Search results</p>)}
      {isLoading ?
        <div className="bg-white h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div> : (
          <div className="w-full md:w-3/4 mx-auto grid  gap-4 mt-8">
            {productFilterByName ? <CardProduct product={productFilterByName} /> : null}
            {productsFilterBySearch.length > 0 ?
              productsFilterBySearch.filter(product => product.id !== productFilterByName.id).map(product => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })
              :
              productsPerPage.filter(product => product.id !== productFilterByName.id).map((product) => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })}

          </div>
        )}

      {/* PAGINATION */}
      <ListButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        pageButtons={pageButtons}
      />

    </>
  )
}

export default Products