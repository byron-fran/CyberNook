import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Product } from "../../interface/Product"
import { formaterDinero } from "../../helpers"
import { Order } from "../../types/cart/Order"
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { createOrderThunk, updateOrderThunk } from "../../redux/thunks/CartThunks";
import Alert from "../Success/Alert"

const CardProduct: React.FC<Product> = ({ product }) => {
  const [successOrder, setSuccessOrder] = useState<boolean>(false)
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.cart)
  const {isAuthenticated} = useAppSelector(state => state.auth)
  const purchase: Order = {
    image: '',
    name: '',
    paid: false,
    quantity: 0,
    price: 0,
    unitPrice: 0,
    category: '',
    mark: '',
    ProductId: '',
    discount: 0,

  }
  
  const handleAddToCart = () => {
    const priceTotal = product.discount > 0 ? (product.price - (product.price * (product.discount / 100))) * 1 : product.price * 1  //product.price * quantity;
    purchase.quantity = 1
    purchase.price = product.price
    purchase.unitPrice = product.price
    purchase.image = product.image
    purchase.name = product.name
    purchase.mark = product.mark
    purchase.ProductId = product.id
    purchase.discount = product.discount

    // Verificar si el producto ya existe
    const productFind = cart.find(p => p.ProductId === product.id);
    if (productFind) {

      if (productFind.paid) {
        dispatch(createOrderThunk({ ...purchase, price: priceTotal }))
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

      dispatch(updateOrderThunk({ id: productFind.id!, order: { ...purchase }, }))
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

    dispatch(createOrderThunk({ ...purchase, price: priceTotal }))
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
  }

  const Navigate = useNavigate();
  return (
    <>
      {successOrder && (
        <Alert message="Product added to cart" />
      )}
      <div className="mx-auto w-full  shadow-md border border-gray-300  p-2 rounded-sm flex flex-col md:flex-row md:justify-between mt-4 gap-4 ">
        <div className="flex gap-4">
          <div className="  cursor-pointer" onClick={() => Navigate(`/product/${product?.id}`)}>
            <img className=' w-[150px] object-contain h-auto md:h-[150px] ' src={`${product.image}`} alt="img-product" />
          </div>
          <div className=" flex flex-col  md:justify-between md:flex-row">
            <div className="flex flex-col justify-center">
              <h2 className="text-[1rem] md:text-[1.3rem]">{product.name}</h2>
              <p className={`md:text-2xl ${product.discount > 0 ? 'line-through text-red-600' : ''} `}>{product.price && formaterDinero(product.price)}</p>
              {product.discount > 0 && (
                <div className="flex items-center">
                  <p className="text-[0.7rem] md:text[1rem]">
                    On offer: {product.discount > 0 && <span className="text-blue-500 font-bold">{formaterDinero(product.price - (product.price * (product.discount / 100)))}</span>}
                    <span className="bg-lime-600  text-white p-1 ml-1 rounded-md text-[10px] md:text-[12px]">Discount{' '}{product.discount}%</span>
                  </p>

                </div>)}
              <div className="flex items-center gap-2 ">
                <img className="w-[20px] h-[20px] object-contain"
                  src="/icons/shipping.png" alt="icon-shipping" />
                <p className=" p-1 rounded-md text-[14px] ">Free Shipping in 14 days</p>
              </div>
            </div>
          </div>

        </div>

        {/*  */}
        <div className="flex md:items-center items-end md:flex-col md:justify-center  gap-2 justify-center ">
          {product.stock! > 0 ? (
            <p className="text-blue-800 font-bold">Available</p>
          ) : <p className="text-red-500">Out of Stock</p>}
          {product.discount > 0 && (
            <p className="bg-blue-800 text-white py-1 px-5 rounded-sm text-[13px]  md:text-[1rem]">Save {formaterDinero(product.price - (product.price - (product.price * (product.discount / 100))))}</p>
          )}
          <button disabled={isAuthenticated ? false : true} className={`bg-orange-500 py-1 flex gap-2 rounded-sm mt-4 ${isAuthenticated ? 'cursor-pointer' : 'cursor-not-allowed hover:opacity-70'}  px-2`}
            onClick={handleAddToCart}>
            <img className="w-[20px] h-[20px]" src="/images/cart.svg" alt="" />
            <p className="text-white font-bold text-[13px] md:text-[1rem]">Add to cart</p>
          </button>
        </div>
      </div>
    </>

  )
}

export default CardProduct