
import { ProductType } from "../../interface/Product";
import { useAppSelector } from "../../redux/hooks/hooks"
import Spinner from "../../spinner/Spinner";
import CardProduct from "../../components/products/CardProduct";
import UsePagination from "../../hooks/UsePagination";
import ListButtons from "../../components/buttons/ListButtons";
const ProductsOferts = () => {

  const { products, isLoading } = useAppSelector(state => state.products);

  const productsByOferts = products.filter((product: ProductType) => product.discount > 0);
  const productsOrderByGreaterDiscount = productsByOferts.sort((a: ProductType, b: ProductType) => b.discount - a.discount);

  const { currentPage, totalPages, renderPaginationButtons, setOffset } = UsePagination();
  if (isLoading) {
    return (
      <div className="bg-white h-[60vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    )
  }
  return (
    <>

      <div className="w-full md:w-3/4 mx-auto grid  gap-4 mt-8">
        {productsOrderByGreaterDiscount.map((product) => (
          <CardProduct key={product.id} product={product} />
        ))}
      </div>
      <ListButtons
        currentPage={currentPage}
        renderPaginationButtons={renderPaginationButtons}
        setOffset={setOffset}
        totalPages={totalPages}
      />
    </>

  )
}

export default ProductsOferts