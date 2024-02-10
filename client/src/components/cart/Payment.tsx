import { useAppSelector, useAppDispatch } from "../../redux/hooks/hooks"
import { formaterDinero } from "../../helpers";
import { Fragment, useEffect, useState } from "react";
import { StripeInterface } from "../../interface/Stripe";
import { getAddressThunk } from "../../redux/thunks/AddressThunk";
import { configHeaders } from "../../redux/thunks/config";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Address } from "../../interface/Address";

const Payment = () => {

  const [priceTotal, setPriceTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0)
  const { cart } = useAppSelector(state => state.cart);
  const[Addresses, setAddress] = useState([] as Address[]);
  const config = configHeaders()
  const dispatch = useAppDispatch();

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
    setQuantityTotal(totalQuantity)
  }, [cart]);
  

  useEffect(() => {
    dispatch(getAddressThunk())
      .then((response) => {
        setAddress(response.payload)
      })
   
  }, []);


  const handlePayment = async () => {
    try {
      const { data } = await axios<StripeInterface>(`${import.meta.env.VITE_BACKEND_URL}/cart/payment-checkout`, config);

      window.location.href = data.url!;
    }
    catch (error : unknown) {
        console.log(error)
        return error
    }


  }

  return (
    <div className="w-full">
      <div>
        <p className="mt-4">Product Details</p>
        <p className="font-bold text-[0.8rem] ">Quantity Products: <span className="text-blue-800">{quantityTotal}</span></p>
        <p className="font-bold text-[0.8rem] ">Subtotal <span className="text-blue-800"> {formaterDinero(priceTotal)}</span></p>
        <p className="font-bold text-[0.8rem]">Shipping Cost: <span className="text-blue-800">$0</span></p>
      </div>

      <div className="border-t border-t-slate-300 mt-4">
        <p className="mt-4">Shipping Address</p>
        {Addresses?.length ? Addresses.map(address => (
          <Fragment key={address.id}>
            <p className="font-bold text-[0.8rem]">Exterior number: <span className="text-blue-800">{address.exteriorNumber}</span></p>
            <p className="font-bold text-[0.8rem]">Street: <span className="text-blue-800">{address.street}</span></p>
            <p className="font-bold text-[0.8rem]">Postal Code: <span className="text-blue-800">{address.postalCode}</span></p>
            <p className="font-bold text-[0.8rem]">City: <span className="text-blue-800">{address.city}</span></p>
            <p className="font-bold text-[0.8rem]">Country: <span className="text-blue-800">{address.country}
            </span></p>
          </Fragment>
        )) : <div className="mt-4">
          <NavLink className='bg-red-500 hover:bg-red-600 text-white w-full p-2 rounded-sm ' to='/profile'>Add your address</NavLink>
          </div>}

      </div>
      <h2 className="text-2xl mt-4">Total: <span className="text-blue-800">{formaterDinero(priceTotal)}</span></h2>
      <button className={`bg-lime-500 hover:bg-lime-600 text-white w-full p-2 rounded-sm uppercase mt-4 ${Addresses?.length ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={handlePayment}
        disabled={Addresses?.length ? false : true}
      >Pay now
      </button>
    </div>
  )
}

export default Payment