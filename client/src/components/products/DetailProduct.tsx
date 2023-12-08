import axios, { AxiosError } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams } from "react-router-dom";
import { formaterDinero, generarId } from "../../helpers";
import { PurchaseType } from "../../interface/Purchase";
import { ProductType } from "../../interface/Product";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createOrderThunk, updateOrderThunk } from "../../redux/thunks/CartThunks";
import { getDetailProduct } from "../../redux/thunks/ProductsThunk";
import { car, cat } from "@cloudinary/url-gen/qualifiers/focusOn";

// import { generarId } from "../../helpers";





const DetailProduct: React.FC = (): JSX.Element | null => {
    const Navigate = useNavigate();
    const { cart, resfreshData, setRefreshData, setCart } = useContext(CartContext)
    const dispatch = useAppDispatch();
    const { cart: orders } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.auth)
    const { products, detailProduct: product } = useAppSelector(state => state.products)

    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);



    useEffect(() => {
        if (id) {
            dispatch(getDetailProduct(id))
            return
        }
    }, [id]);


    useEffect(() => {
        const getCartPurchase = async () => {
            const url = `http://localhost:4000/list_order`;
            try {
                // setRefreshData(false)
                const { data } = await axios(url);
                //console.log(data)
                setCart(data)
                return data
            }
            catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.log(error.message)
                }
            }
        }
        getCartPurchase();
    }, [resfreshData, setCart]);




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

    const addToCart = async (order : any) => {
        try{
            const {data} = await axios.post(`http://localhost:4000/order`, order, {
                withCredentials : true
            })
            console.log(data)
         }
        catch(error){
            console.log(error)
        }
    }

    //console.log(cart)
    const handleAddPurchase = async () => {
        
        let priceTotal = product.price * quantity;   
        const productExist = user.Orders?.find(order => order.id === product.id);
        if(productExist){
            dispatch(updateOrderThunk({id : productExist.id, order : { ...product, quantity, price: priceTotal}}))
            return
        }
        dispatch(createOrderThunk({ ...product, quantity, price: priceTotal}))
    

    }

    return (
        <>
            <div className="grid md:grid-cols-2 w-full lg:w-3/4 mx-auto gap-10 bg-slate-300 p-10 mt-20">
                <div>
                    <h2 className="text-center mb-4 text-2xl">{product.name}</h2>
                    <img className="w-9/12 md:w-[400px] mx-auto" src={`http://localhost:4000/store/product_image/${product?.image}`} alt="img-product" />

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