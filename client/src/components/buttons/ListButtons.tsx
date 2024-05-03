
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../redux/hooks/hooks";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { getProductsThunk } from "../../redux/thunks/ProductsThunk";


const ListButtons = () => {

    const navigate = useNavigate();
    const { currentPage, totalItems, totalPages, nextPage, previousPage } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();

    const handleChangePage = (page: number) => {

        dispatch(getProductsThunk({ offset: page }));

    };

    return (

        <>
            {totalItems > 0 && (
                <div className={`flex gap-3  mx-auto justify-center  flex-wrap ${totalItems > 3 ? 'mt-10' : 'mt-[10rem]'} `}>
                    <button
                        className={`${previousPage === 0 || previousPage === undefined ? 'opacity-70 cursor-not-allowed' : ' opacity-100'} border border-gray-300 py-2 px-3 rounded-sm`}
                        disabled={previousPage === 0 || previousPage === undefined}
                        onClick={() => {
                            handleChangePage(previousPage)
                            navigate(`?page=${previousPage}`)
                        }}
                    >
                        back
                    </button>
                    {/* list buttons pages */}
                    {Array.from({ length: totalPages }, (_, index) => {
                        let i = index + 1
                        return (
                            <button
                                key={i}
                                disabled={currentPage === i}
                                className={`${currentPage === i ? 'bg-blue-800 text-white': 'border text-blue-700 border-blue-700'} py-2 px-3 rounded-sm`}
                                onClick={() => {
                                    handleChangePage(i)
                                    navigate(`?page=${i}`)
                                }}
                            >
                                {i}
                            </button>
                        )
                    })}
                    <button
                        disabled={nextPage === 0 || nextPage === undefined}
                        className={`${nextPage === 0 || nextPage === undefined ? 'opacity-70 cursor-not-allowed' : ' opacity-100'} border border-gray-300 py-2 px-3 rounded-sm`}
                        onClick={() => {
                            handleChangePage(nextPage)
                            navigate(`?page=${nextPage}`)
                        }}
                    >
                        next
                    </button>
                </div>
            )}
        </>
    )
}

export default ListButtons