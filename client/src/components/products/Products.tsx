import CardProduct from "./CardProduct"
import Spinner from "../../spinner/Spinner";
import { useAppSelector } from "../../redux/hooks/hooks";
import UsePagination from "../../hooks/UsePagination";
import ListButtons from "../buttons/ListButtons";

const Products = () => {
  const { products, isLoading } = useAppSelector(state => state.products)
  const { currentPage, totalPages, renderPaginationButtons, setOffset } = UsePagination();

  return (
    <>

      {isLoading ?
        <div className="bg-white h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div> : (
          <>
            <div className="w-full md:w-3/4 mx-auto grid  gap-4 mt-8">
              {
                products.map((product) => {
                  return (
                    <CardProduct key={product.id} product={product} />
                  )
                })
              }

            </div>
            <ListButtons
              currentPage={currentPage}
              renderPaginationButtons={renderPaginationButtons}
              setOffset={setOffset}
              totalPages={totalPages}

            />
          </>
        )}

    </>
  )
}

export default Products