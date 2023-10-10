import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formaterDinero } from "../../helpers";
import { PurchaseType } from "../../interface/Purchase";
import Cart from "../cart/Cart";
import { Cart as CartInterface } from "../../interface/Cart";

import { ProductType } from "../../interface/Product";
// import { generarId } from "../../helpers";


const DetailProduct : React.FC<CartInterface> = ({cart , setCart}) => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(0);
    const [product, setProduct] = useState<ProductType>({
        image: '',
        price: 0,
        name : '',
        id : ''
        
    });
  

    const infoPurchase:  PurchaseType = {
        name: '',
        image: '',
        quantityProduct: 0,
        price: 0
    }
    useEffect(() => {
        const getProduct = async () => {
            const url = `http://localhost:4000/store/product/${id}`;
            const { data } = await axios(url);
            setProduct(data)
        };
        getProduct();

    }, [id]);
    if (!product || product.image === undefined) { return null }

    const handleAddQuantityProduct = () => {
        setQuantity(value => value + 1)
    };
    const handleLessQuantityProduct = () => {
        setQuantity(value => value - 1);
        if (quantity <= 0) {
            setQuantity(0);
            return
        }
    };

    const handleAddPurchase = async () => {
        const priceTotal: number = quantity * product.price
        // console.log(priceTotal)
       
        if (quantity !== 0) {
            infoPurchase.name = product.name;
            infoPurchase.price = priceTotal;
            infoPurchase.image = product.image;
            infoPurchase.quantityProduct = quantity;
            // console.log(cart)
            // console.log(infoPurchase.image)
            const purchaseFound = cart.find(purchase => purchase.image === infoPurchase.image);
            if(purchaseFound){
                try {
                    const url = `http://localhost:4000/store/cart/${purchaseFound.id}`;
                    const { data } = await axios.put(url, infoPurchase);
                    console.log(data)
                    return data
                }
                catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        console.log(error.message);
                        return
                    }
                }
            }
            else{
                try {
                    const url = `http://localhost:4000/store/cart`;
                    const { data } = await axios.post(url, infoPurchase);
                    console.log(data)
                    return data
                }
                catch (error: unknown) {
                    if (error instanceof AxiosError) {
                        console.log(error.message);
                        return
                    }
                }
            }
  

            return
        }
    }

    return (
        <>
            <div>
                <div>
                    <h2>{product.name}</h2>
                    <img className="product_image" src={`http://localhost:4000/store/product_image/${product?.image }`} alt="img-product" />
                    <p>{product.price && formaterDinero(product.price)}</p>
                </div>
                <div>

                    <div>
                        <button onClick={handleLessQuantityProduct}>-</button>
                        <button>{quantity}</button>
                        <button onClick={handleAddQuantityProduct}>+</button>
                    </div>
                    <div>
                        <button onClick={handleAddPurchase}>Agregar</button>
                    </div>
                </div>
            </div>
            <Cart cart={cart} setCart={setCart}/>
        </>
    )
}

export default DetailProduct