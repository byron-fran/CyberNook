import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { getProductByMark } from "../../redux/thunks/MarksThunk";
import CardProduct from "../../components/products/CardProduct";
import UsePagination from "../../hooks/UsePagination";
import ListButtons from "../../components/buttons/ListButtons";

const MarkPage = () => {
    const dispatch = useAppDispatch()
    const { mark } = useParams();
    const { prodocustByMark } = useAppSelector(state => state.marks)

    useEffect(() => {
        if (mark) {
            dispatch(getProductByMark(mark))
        }
    }, [dispatch, mark]);

    const { currentPage, pageButtons, totalPages, setCurrentPage, productsPerPage } = UsePagination(prodocustByMark, 10)

    return (
        <>
            <main>
                <h2 className="text-center mt-4 uppercase font-extrabold ">{mark}</h2>
                <div className="w-full md:w-3/4 mx-auto grid mmt-8" >
                    {productsPerPage.length > 0 ? prodocustByMark?.map(product => (
                        <CardProduct key={product.id} product={product} />
                    )) : (<p className="text-center">Empty</p>)}
                </div>

            </main>
            <ListButtons
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                pageButtons={pageButtons}
            />
        </>
    )
}

export default MarkPage