import CardProduct from "./CardProduct"
import Spinner from "../../spinner/Spinner";
import { useAppSelector } from "../../redux/hooks/hooks";
import ListButtons from "../buttons/ListButtons";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getProductsThunk } from "../../redux/thunks/ProductsThunk";

const Products = () => {

  const { products, isLoading } = useAppSelector(state => state.products)

  const { search } = useLocation()
  let query = useMemo(() => new URLSearchParams(search), [search]);
  const dispatch = useAppDispatch();

  const category = query.get('category')
  const mark = query.get('mark');

  useEffect(() => {

    if (mark || category) {
      dispatch(getProductsThunk({ offset: 1, category: category!, mark: mark! }))
    };

  }, [mark, category]);

  return (
    <>

      {isLoading ?
        <div className="bg-white h-[60vh] w-full flex items-center justify-center">
          <Spinner />
        </div> : (
          <>
            <div className="w-full md:w-3/4 mx-auto grid  gap-4 mt-8">
              {
                products.map((product) => {
                  return (
                    <CardProduct key={product.id} product={product} />
                  )
                })
              }

            </div>
            <ListButtons />
          </>
        )}

    </>
  )
}

export default Products