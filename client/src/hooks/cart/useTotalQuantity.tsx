import { useEffect, useState } from "react"
import { useAppSelector } from "../../redux/hooks/hooks";

const useTotalQuantity = () => {

    const [priceTotal, setPriceTotal] = useState(0);
    const [quantityTotal, setQuantityTotal] = useState(0)
    const { cart } = useAppSelector(state => state.cart);
    
    useEffect(() => {
        // Calcula el precio total cuando Orders cambia
        let total = 0;
        let totalQuantity = 0;
        if (cart) {
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].paid !== true) {
                    total += cart[i].price
                    totalQuantity += cart[i].quantity
                }

            }
        }

        setPriceTotal(total);
        setQuantityTotal(totalQuantity);

    }, [cart]);

    return {
        priceTotal,
        quantityTotal
    }
}
export default  useTotalQuantity