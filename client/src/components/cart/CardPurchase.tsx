import { Purchase  as PurchaseIterface} from "../../interface/Purchase"
// import { Cart } from "../../interface/Cart"
import React from "react"

const CardPurchase : React.FC <PurchaseIterface> = ({purchase }) => {

  return (
    <div>
        <div>
          <h2>{purchase.name}</h2>
          <img className="purchase_image" src={`http://localhost:4000/store/product_image/${purchase?.image}`} alt="img-purchase" />
          <p>{purchase.price}</p>
          <p>{purchase.quantityProduct}</p>
        </div>
    </div>
  )
}

export default CardPurchase