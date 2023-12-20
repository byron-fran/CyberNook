import { useNavigate } from "react-router-dom"
import { Product } from "../../interface/Product"
import React from "react"
import { formaterDinero } from "../../helpers"

const CardProduct: React.FC<Product> = ({ product }) => {
  const Navigate = useNavigate();
  return (
    <div onClick={() => Navigate(`/detail/${product?.id}`)} className="mx-auto w-full  shadow-md border border-gray-300  p-2 rounded-sm">

      <div className=" mx-auto flex justify-center">
        <img className='w-full md:w-[150px] object-contain h-auto md:h-[150px]' src={`${product.image}`} alt="img-product" />
      </div>
      <h2 className="text-center">{product.name}</h2>
      <p className="text-center text-2xl ">{product.price && formaterDinero(product.price)}</p>

    </div>
  )
}

export default CardProduct