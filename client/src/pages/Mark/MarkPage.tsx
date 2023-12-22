import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getProductByMark } from "../../redux/thunks/MarksThunk";
import CardProduct from "../../components/products/CardProduct";


const MarkPage = () => {
    const dispatch = useAppDispatch()
    const { mark } = useParams();
    const { prodocustByMark } = useAppSelector(state => state.marks)

    useEffect(() => {
        if (mark) {
            dispatch(getProductByMark(mark))
        }
    }, [dispatch, mark]);

 
    return (
        <>
            <main>
                <h2 className="text-center mt-4 uppercase font-extrabold ">{mark}</h2>
                <div className="w-full md:w-3/4 mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8" >
                    {prodocustByMark.length > 0 ? prodocustByMark?.map(product => (
                        <CardProduct key={product.id} product={product} />
                    )) : (<p className="text-center">Empty</p>)}
                </div>

            </main>
        </>
    )
}

export default MarkPage