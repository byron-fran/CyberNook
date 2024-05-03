import { Order } from "../../types/cart/Order";

export const calculateTotalQuantity = (cart : Order[]) => {

    const cartNoPaid = cart.filter(order => order.paid === !true)

    let totalQuantity : number = 0;

    for(let i = 0; i<cartNoPaid.length; i++){
        totalQuantity += cartNoPaid[i].quantity
    };

    return totalQuantity
}