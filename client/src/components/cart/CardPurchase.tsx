import { FC, } from "react"
import { formaterDinero } from "../../helpers"
import { NavLink } from "react-router-dom"

import { Order } from "../../types/cart/Order"

type OrderProps = {
  purchase: Order,
  filterOrdersByDelete: (id: number) => void

}

const CardPurchase: FC<OrderProps> = ({ purchase, filterOrdersByDelete }) => {


  const handleDeleteById = (id: number) => {
    filterOrdersByDelete(id)
  }
  return (

    <div className="flex border border-slate-300 w-full items-start md:items-center p-4 gap-4 flex-col sm:flex-row sm:justify-between">
      <div className="flex items-center gap-4">
        <NavLink to={`/product/${purchase.ProductId}`}>
          <img className="w-[75px] sm-[80px] object-contain md:h-[80px]" src={purchase?.image} alt="img-purchase" />
        </NavLink>

        <div className="flex flex-col items-start">
          <p className="font-bold text-[0.8rem]">Product: <span className="text-blue-800">{purchase.name}</span></p>
          <p className="font-bold text-[0.8rem]">Quantity:<span className="text-blue-800"> {purchase.quantity}</span></p>
          <p className="font-bold text-[0.8rem]">Price: <span className={`${purchase.discount > 0 ? 'line-through text-red-800' : ''}`}> {formaterDinero(purchase.unitPrice)} </span>
            {purchase.discount > 0 && <span className="text-blue-600 ml-1">  {formaterDinero(purchase.unitPrice - (purchase.unitPrice * (purchase.discount / 100)))}</span>}</p>

        </div>
      </div>
      <div className="flex sm:flex-col justify-between gap-2 items-center">
        <p className="font-bold text-[0.7rem] bg-blue-800 text-white p-1 rounded-md">Save<span className=""> {formaterDinero(purchase.unitPrice * (purchase.discount / 100))}</span></p>
        <p className="font-bold text-[0.7rem] bg-lime-600 text-white p-1 rounded-md">Discount {purchase.discount}%</p>

        <img onClick={() => handleDeleteById(purchase.id!)} className="w-[20px] h-[20px] cursor-pointer" src="/images/basura.png" alt="img-trash" />
      </div>

    </div>


  )
}

export default CardPurchase