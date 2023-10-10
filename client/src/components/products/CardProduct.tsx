import { useNavigate } from "react-router-dom"
import { Product } from "../../interface/Product"
import React from "react"

const CardProduct : React.FC<Product> = ({product}) => {
    const Navigate = useNavigate();
    
  return (
    <div onClick={() => Navigate(`/detail/${product.id}`)}>
        <h2>{product.name}</h2>
        <img className="product_image" src={`http://localhost:4000/store/product_image/${product.image}`} alt="img-product" />
        <p>{product.price}</p>
    </div>
  )
}

export default CardProduct