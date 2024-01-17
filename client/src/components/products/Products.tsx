import { useEffect, useState } from "react";
import CardProduct from "./CardProduct"
import { useAppSelector } from "../../redux/hooks/hooks"
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import Spinner from "../../spinner/Spinner";
import { ProductType } from "../../interface/Product";
import UsePagination from "../../hooks/UsePagination";

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
    productsPerPage } = UsePagination(products, 12);

  useEffect(() => {
    const getProductFilters = async () => {

      if (filter || category || filter) {
        try {

          setIsLoading(true)
          const { data } = await axios(`http://localhost:4000/store/products/?category=${category}&name=${name}&filter=${filter}`);
          setIsLoading(false)
          setProductFilterByName(data.product)
          setProductsFilterBySearch(data.products.filter((product: ProductType) => product.id !== data.product.id));

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
              productsFilterBySearch.map(product => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })
              : productsPerPage.map((product) => {
                return (
                  <CardProduct key={product.id} product={product} />
                )
              })}
          </div>
        )}

      {/* PAGINATION */}
      <div className='mt-6 flex justify-center items-center gap-4'>
        {currentPage !== 1 && (
          <button
            className='border border-slate-300 p-2 rounded-md'
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >Back</button>
        )}

        {pageButtons()?.map((button, index) => {
          return (
            <div key={index}>
              <button
                className={`${currentPage !== button ? 'border border-slate-300 p-2 rounded-md' : 'bg-blue-800 text-white p-2 rounded-md'}`}
                disabled={button === currentPage}
                onClick={() => setCurrentPage(button)}>{button}</button>
            </div>
          )
        })}

        {currentPage !== totalPages && (
          <button
            className='border border-slate-300 p-2 rounded-md'
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >Next</button>
        )}
        {totalPages !== 1 && (
          <button
            className='border border-slate-300 p-2 rounded-md'
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage(totalPages)
            }}
          >Last</button>
        )}
      </div>

    </>
  )
}

export default Products