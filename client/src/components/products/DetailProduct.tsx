import React, { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";
import { formaterDinero } from "../../helpers";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createOrderThunk, updateOrderThunk } from "../../redux/thunks/CartThunks";
import { getDetailProduct, clearDetailProductThunk } from "../../redux/thunks/ProductsThunk";
import { Order } from "../../types/cart/Order";
import Reviews from "../reviews/Reviews";
import Spinner from "../../spinner/Spinner";

const DetailProduct: React.FC = (): JSX.Element => {

    const Navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { detailProduct: product, isLoading } = useAppSelector(state => state.products);
    const { cart } = useAppSelector(state => state.cart);
    const { isAuthenticated } = useAppSelector(state => state.auth)
    console.log(product)

    const purchase: Order = {
        image: '',
        name: '',
        paid: false,
        quantity: 0,
        price: 0,
        unitPrice: 0,
        category: '',
        mark: '',
        ProductId: ''


    }


    useEffect(() => {
        // Cargar el detalle del producto si hay un ID válido
        if (id) {
            dispatch(getDetailProduct(id));

        }
        return () => {
            dispatch(clearDetailProductThunk())
        }
    }, [dispatch, id]);


    const handleAddQuantityProduct = () => {
        setQuantity(value => value + 1);


    };
    const handleLessQuantityProduct = () => {
        setQuantity(value => value - 1);
        if (quantity <= 1) {
            setQuantity(1);
            return
        }
    };
  

    const handleAddPurchase = async () => {
        const unitPrice = product.price;
        const priceTotal = product.price * quantity;
    
        purchase.unitPrice = unitPrice
        purchase.price = priceTotal
        purchase.quantity = quantity
        purchase.image = product.image
        purchase.category = product.category
        purchase.mark = product.mark
        purchase.name = product.name;
        purchase.paid = false;
        purchase.ProductId = product.id
    
        const productExist = cart?.find(order => order.ProductId === product.id);
 
        if (productExist) {
            // Actualizar producto en el carrito
            dispatch(updateOrderThunk({ id: productExist.id!, order: { ...purchase, quantity, price: priceTotal, paid: false, unitPrice } }))
                .then(() => { Navigate('/cart') })
                .catch((error: unknown) => { console.error(error) });
        } else  {
            // Crear una nueva orden
            dispatch(createOrderThunk({ ...purchase, paid: false }))
                .then(() => { Navigate('/cart') })
                .catch((error: unknown) => { console.error(error) });
        } 
    }
    

    return (
        <>
            {isLoading ? (
                <div className="bg-white h-[60vh] w-full flex items-center justify-center">
                    <Spinner />
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 w-full lg:w-3/4 mx-auto gap-10   p-8 mt-10">
                        <div>
                            <h2 className="text-center mb-4 text-2xl">{product.name}</h2>
                            <img className="w-9/12 md:w-[300px] md:h-[300px] mx-auto object-contain" src={`${product.image}`} alt="img-product" />

                        </div>

                        <div className="flex flex-col justify-center items-center">
                            <p className="text-2xl ">Price: {product.price && formaterDinero(product.price)}</p>

                            <ul className="mt-4">
                                <li>memory: <span>12gb</span></li>
                                <li>size: <span>6.4 inch</span></li>
                                <li>ram <span>16gb</span></li>
                                <li>Color : <span>blue</span></li>
                                <li>weight: <span>1 kg</span></li>
                                <li> mesasures: <span>12 x 13 ml</span></li>
                            </ul>

                            {product.stock! >= 1 && (
                                <div className="mt-8 flex gap-8 justify-center mb-4 w-full">
                                    <button className="text-red-500 hover:text-white hover:bg-red-600  border border-1 border-red-500 w-10 rounded-sm text-2xl font-bold"
                                        onClick={handleLessQuantityProduct}>-</button>
                                    <button className="text-2xl">{quantity}</button>
                                    <button className="text-blue-500 hover:text-white hover:bg-blue-600  border border-1 border-blue-500 w-10 rounded-sm text-2xl font-bold"
                                        disabled={quantity >= product.stock! ? true : false}
                                        onClick={handleAddQuantityProduct}>+
                                    </button>

                                </div>
                            )}

                            {product.stock! <= 0 ?
                                (<p className="text-red-500 font-bold uppercase">sold out</p>) :
                                (<p className="font-bold uppercase">Stock: <span className={`${product.stock! <= 5 ? 'text-red-500' : 'text-blue-800'}`}>{product.stock}</span></p>)}

                            <div className="w-full mt-4">
                                {!isAuthenticated && (
                                    <NavLink className='bg-blue-800 text-white mx-auto  w-[50%] text-center block mb-4 p-2 rounded-md text-[0.7rem] uppercase' to='/login'>create account or sign In</NavLink>
                                )}
                                <button className=" bg-orange-500 hover:bg-orange-600 cursor-pointer text-white font-bold p-2 w-full block rounded-md uppercase"
                                    disabled={product.stock! <= 0 || !isAuthenticated ? true : false}
                                    onClick={() => {
                                        if (!isAuthenticated || product.stock! <= 0) {
                                            return
                                        }
                                        handleAddPurchase()
                                    }}>add to cart</button>
                            </div>
                        </div>
                    </div>
                    <div className=' md:w-[90%] mx-auto  mb-4'>
                        <h2 className="text-center text-[1.4rem]">Description</h2>
                        <p className="">{product.description && product.description}</p>
                    </div>
                    <Reviews product={product} />
                </>
            )}

        </>
    )
}

export default DetailProduct