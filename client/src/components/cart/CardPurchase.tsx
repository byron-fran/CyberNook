import { FC,  } from "react"
import { formaterDinero } from "../../helpers"
import { NavLink } from "react-router-dom"

import { Order } from "../../types/cart/Order"

type OrderProps = {
  purchase: Order,
  filterOrdersByDelete : (id: number) => void

}

const CardPurchase: FC<OrderProps> = ({ purchase, filterOrdersByDelete }) => {


  const handleDeleteById = (id : number) => {
    filterOrdersByDelete(id)
  }
  return (

    <div className="flex border border-slate-300 w-full items-center p-4 gap-4 justify-between">
      <div className="flex items-center gap-4">
        <NavLink to={`/detail/${purchase.ProductId}`}>
          <img className="w-[60px] md:w-[80px] object-contain md:h-[80px]" src={purchase?.image} alt="img-purchase" />
        </NavLink>

        <div className="flex flex-col items-start">
          <p className="font-bold text-[0.8rem]">Product: <span className="text-blue-800">{purchase.name}</span></p>
          <p className="font-bold text-[0.8rem]">Quantity:<span className="text-blue-800"> {purchase.quantity}</span></p>
          <p className="font-bold text-[0.8rem]">Price: <span className="text-blue-800"> {formaterDinero(purchase.price)}</span></p>
        </div>
      </div>

      <img onClick={() => handleDeleteById(purchase.id!)}  className="w-[20px] h-[20px] cursor-pointer" src="/images/basura.png" alt="img-trash" />
    </div>


  )
}

export default CardPurchase