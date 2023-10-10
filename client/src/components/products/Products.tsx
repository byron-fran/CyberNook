import CardProduct from "./CardProduct"
import '../../css/products.css'
import { Products as ProductsArray } from "../../interface/Products"
import React from "react"


const Products : React.FC< ProductsArray> = ({productos }) => {
  return (
    <div>
        {productos.map((product ) => {
            return (
                <CardProduct key={product.id} product={product}/>
            )
        })}
    </div>
  )
}

export default Products