import { ProductType } from "../interface/Product"
import { Order } from "../types/cart/Order"

export const createOrder = (product : Order | ProductType,quantity : number, idProduct : string) : Order => {
    const order: Order = {
        quantity,
        name: product.name,
        category: product.category,
        discount: product.discount,
  
        image: product.image,
        price: product.discount > 0 ? 
                                (product.price - (product.price * (product.discount / 100)))
                                 * quantity : product.price * quantity,  
        paid: false,
        unitPrice: product.price,
        ProductId: idProduct,

    }

    return order
}