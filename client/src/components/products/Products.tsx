import CardProduct from "./CardProduct"
import { useAppSelector } from "../../redux/hooks/hooks"

const Products = () => {
  const {products} = useAppSelector(state => state.products)

  return (
    <div className="w-full md:w-3/4 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product ) => {
            return (
                <CardProduct key={product.id} product={product}/>
            )
        })}
    </div>
  )
}

export default Products