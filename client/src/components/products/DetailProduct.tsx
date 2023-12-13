import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { formaterDinero } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createOrderThunk, updateOrderThunk } from "../../redux/thunks/CartThunks";
import { getDetailProduct } from "../../redux/thunks/ProductsThunk";
import { clearDetailProduct } from "../../redux/slices/ProductsSilce";

const DetailProduct: React.FC = (): JSX.Element | null => {
    const Navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { detailProduct: product } = useAppSelector(state => state.products)

    useEffect(() => {
        if (id) {
            dispatch(getDetailProduct(id))
            return
        }
        return () => {
            dispatch(clearDetailProduct())
        }
    }, [id]);


    const handleAddQuantityProduct = () => {
        setQuantity(value => value + 1)
    };
    const handleLessQuantityProduct = () => {
        setQuantity(value => value - 1);
        if (quantity <= 1) {
            setQuantity(1);
            return
        }
    };

    const handleAddPurchase = async () => {

        const priceTotal = product.price * quantity;
 
        const productExist = user.Orders?.find(order => order.id === product.id);
        if (productExist) {
            dispatch(updateOrderThunk({ id: productExist.id, order: { ...product, quantity, price: priceTotal, paid: false } }))
                .then(() => {
                    Navigate('/cart')
                })
            return
        }
        dispatch(createOrderThunk({ ...product, quantity, price: priceTotal }))
            .then(() => {
                Navigate('/cart')
            })


    }

    return (
        <>
            <div className="grid md:grid-cols-2 w-full lg:w-3/4 mx-auto gap-10   p-8 mt-10">
                <div>
                    <h2 className="text-center mb-4 text-2xl">{product.name}</h2>
                    <img className="w-9/12 md:w-[300px] md:h-[300px] mx-auto object-contain" src={`${product.image}`} alt="img-product" />

                </div>

                <div className="flex flex-col justify-center items-center">
                    <p className="text-2xl ">Price: {product.price && formaterDinero(product.price)}</p>
                    <div className="mt-40 flex gap-8 justify-center mb-10 w-full">
                        <button className="text-red-500 hover:text-white hover:bg-red-600  border border-1 border-red-500 w-10 rounded-sm text-2xl font-bold"
                            onClick={handleLessQuantityProduct}>-</button>
                        <button className="text-2xl">{quantity}</button>
                        <button className="text-blue-500 hover:text-white hover:bg-blue-600  border border-1 border-blue-500 w-10 rounded-sm text-2xl font-bold"
                            onClick={handleAddQuantityProduct}>+</button>
                        <img className="w-[30px] cursor-pointer" src="/images/basura.png" alt="image-garbage" />
                    </div>
                    <div className="w-full">
                        <button className=" bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold p-2 w-full block rounded-md uppercase"
                            onClick={handleAddPurchase}>add to cart</button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default DetailProduct