import { useState } from "react";
import { ProductType } from "../../interface/Product";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { Order } from "../../types/cart/Order";
import { createOrderThunk, updateOrderThunk } from "../../redux/thunks/CartThunks";
import { useNavigate } from "react-router-dom";

const useCreateOrder = (product: ProductType) => {

    const [quantity, setQuantity] = useState(1);
    const { cart } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const purchase: Order = {} as Order;
    const Navigate = useNavigate();

    const handleAddPurchase = async (): Promise<void> => {
        //calcular el total de la orden
        const unitPrice = product.price;

        const priceTotal = product.discount > 0 ? (product.price - (product.price * (product.discount / 100))) * quantity : product.price * quantity   //product.price * quantity;

        // Crear objeto de orden
        purchase.unitPrice = unitPrice
        purchase.price = priceTotal
        purchase.quantity = quantity
        purchase.image = product.image
        purchase.category = product.category
        purchase.mark = product.mark
        purchase.name = product.name;
        purchase.paid = false;
        purchase.ProductId = product.id
        purchase.discount = product.discount;


        const productExist = cart?.find(order => order.ProductId === product.id);

        if (productExist) {
            // Actualizar producto en el carrito
            if (productExist.paid) {

                dispatch(createOrderThunk({ ...purchase, paid: false, quantity, price: priceTotal }))
                    .then(() => { Navigate('/cart') })
                    .catch((error: unknown) => { console.error(error) });
                return
            }
            dispatch(updateOrderThunk({ id: productExist.id!, order: { ...purchase, quantity, price: priceTotal, paid: false, unitPrice } }))
                .then(() => { Navigate('/cart') })
                .catch((error: unknown) => { console.error(error) });
        } else {
            //Crear una nueva orden
            dispatch(createOrderThunk({ ...purchase, paid: false, quantity, price: priceTotal }))
                .then(() => { Navigate('/cart') })
                .catch((error: unknown) => { console.error(error) });
        }
    };
    
    return {
        handleAddPurchase,
        quantity,
        setQuantity
    }
}

export default useCreateOrder