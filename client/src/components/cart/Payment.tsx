import { useAppSelector} from "../../redux/hooks/hooks"
import { formaterDinero } from "../../helpers";
import { Fragment, useEffect, useState } from "react";
import { StripeInterface } from "../../interface/Stripe";

import axios from "axios";

const Payment = () => {
  const [priceTotal, setPriceTotal] = useState(0);
  const [quantityTotal, setQuantityTotal] = useState(0)
  const { cart } = useAppSelector(state => state.cart);
  const { user: { Addresses } } = useAppSelector(state => state.auth)

  useEffect(() => {
    // Calcula el precio total cuando Orders cambia
    let total = 0;
    let totalQuantity = 0;
    if (cart) {
      for (let i = 0; i < cart.length; i++) {
        total += cart[i].price
        totalQuantity += cart[i].quantity
      }
    }

    setPriceTotal(total);
    setQuantityTotal(totalQuantity)
  }, [cart]);


  const handlePayment = async () => {
    // const updatePromises = cart.map((order) => (
    //  axios.put(`http://localhost:4000/order/${order.id}`, {...order, paid : true}, {
    //       withCredentials : true
    //   })));

    //   const res = await Promise.all(updatePromises);
    try {
      const { data } = await axios<StripeInterface>('http://localhost:4000/cart/payment-checkout', { withCredentials: true })
      console.log(data)
     // window.location.href = data.session.url;
    }
    catch (error) {
      console.log(error)
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
        {Addresses && Addresses.map(address => (
          <Fragment key={address.id}>
            <p className="font-bold text-[0.8rem]">Exterior number: <span className="text-blue-800">{address.exteriorNumber}</span></p>
            <p className="font-bold text-[0.8rem]">Street: <span className="text-blue-800">{address.street}</span></p>
            <p className="font-bold text-[0.8rem]">Postal Code: <span className="text-blue-800">{address.postalCode}</span></p>
            <p className="font-bold text-[0.8rem]">City: <span className="text-blue-800">{address.city}</span></p>
            <p className="font-bold text-[0.8rem]">Country: <span className="text-blue-800">{address.country}
            </span></p>
          </Fragment>
        ))}

      </div>
      <h2 className="text-2xl mt-4">Total: <span className="text-blue-800">{formaterDinero(priceTotal)}</span></h2>
      <button className="bg-lime-500 hover:bg-lime-600 text-white w-full p-2 rounded-sm uppercase mt-4"
        onClick={handlePayment}
      >Pay now
      </button>
    </div>
  )
}

export default Payment