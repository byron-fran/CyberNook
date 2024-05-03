import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks"
import { createOrderThunk } from "../../redux/thunks/CartThunks"
import { updateOrderThunk } from "../../redux/thunks/CartThunks"
import { createOrder } from "../../utils/createOrder"
import { ProductType } from "../../interface/Product"
import { Order } from "../../types/cart/Order"

const useCreateOneOrder = (product: ProductType | Order) => {

    const { cart } = useAppSelector(state => state.cart)
    const [successOrder, setSuccessOrder] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const newOrder = createOrder(product, 1, product.id!);

    // Verificar si el producto ya existe
    const productFind = cart.find(p => p.ProductId === product.id);

    const handleAddToCart = () => {

        if (productFind) {

            if (productFind.paid) {

                dispatch(createOrderThunk({ ...newOrder }))
                    .then(() => {
                        setSuccessOrder(true)

                        setTimeout(() => {
                            setSuccessOrder(false)
                        }, 2000)
                    })
                    .catch(error => {
                        setSuccessOrder(false)
                        throw new Error(error)

                    })
                return
            }

            dispatch(updateOrderThunk({ id: productFind.id!, order: { ...newOrder }, }))
                .then(() => {
                    setSuccessOrder(true)
                    setTimeout(() => {
                        setSuccessOrder(false)
                    }, 2000)
                })
                .catch(error => {
                    setSuccessOrder(false)
                    throw new Error(error)

                })
            return
        }
        // Si no existe, agregarlo

        dispatch(createOrderThunk({ ...newOrder }))
            .then(() => {
                setSuccessOrder(true)

                setTimeout(() => {
                    setSuccessOrder(false)
                }, 2000)
            })
            .catch(error => {
                setSuccessOrder(false)
                throw new Error(error)

            });

    };
    return {
        successOrder,
        handleAddToCart
    }

}

export default  useCreateOneOrder