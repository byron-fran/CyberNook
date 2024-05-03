import { useAppSelector } from "../../redux/hooks/hooks"
import { formaterDinero } from "../../helpers";
import { Fragment } from "react";
import { StripeInterface } from "../../interface/Stripe";
import { NavLink } from "react-router-dom";
import { cybernookApi as axios } from "../../config/api/cybernookApi";
import useTotalQuantity from "../../hooks/cart/useTotalQuantity";

const Payment = () => {

  const { address } = useAppSelector(state => state.address)
  const {priceTotal,quantityTotal} = useTotalQuantity()

  const handlePayment = async () => {
    try {
      const { data } = await axios.get<StripeInterface>(`/cart/payment-checkout`);

      window.location.href = data.url!;
    }
    catch (error: unknown) {
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
        {address ?
          <Fragment >
            <p className="font-bold text-[0.8rem]">Exterior number: <span className="text-blue-800">{address?.exteriorNumber}</span></p>
            <p className="font-bold text-[0.8rem]">Street: <span className="text-blue-800">{address?.street}</span></p>
            <p className="font-bold text-[0.8rem]">Postal Code: <span className="text-blue-800">{address?.postalCode}</span></p>
            <p className="font-bold text-[0.8rem]">City: <span className="text-blue-800">{address?.city}</span></p>
            <p className="font-bold text-[0.8rem]">Country: <span className="text-blue-800">{address?.country}
            </span></p>
          </Fragment>
          : <div className="mt-4">
            <NavLink className='bg-red-500 hover:bg-red-600 text-white w-full p-2 rounded-sm ' to='/profile'>Add your address</NavLink>
          </div>}

      </div>
      <h2 className="text-2xl mt-4">Total: <span className="text-blue-800">{formaterDinero(priceTotal)}</span></h2>
      <button className={`bg-lime-500 hover:bg-lime-600 text-white w-full p-2 rounded-sm uppercase mt-4 ${Object.values(address).length > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={handlePayment}
        disabled={Object.values(address).length > 0 ? false : true}
      >Pay now
      </button>
    </div>
  )
}

export default Payment