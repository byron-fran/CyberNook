import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"


interface ListButtonsProps {
    currentPage: number,
    totalPages: number,
    renderPaginationButtons: Function,
    setOffset: Dispatch<SetStateAction<number>>
}

const ListButtons = ({ currentPage, totalPages, setOffset, renderPaginationButtons }: ListButtonsProps) => {
    const navigate = useNavigate()
    return (
        <div className="flex gap-4 w-[200px] mx-auto justify-center mt-4">
    
            <button
                disabled={currentPage === 1}
                className={` border border-blue-800 p-4 ${currentPage === 1 && 'opacity-25 cursor-not-allowed'}`}
                onClick={() => {
                    setOffset(currentPage - 1)
                    navigate(`?page=${currentPage - 1}`)
                }}
            >Back
            </button>
            {renderPaginationButtons()}
            <button
                disabled={Number(totalPages) === currentPage}
                className={` border border-blue-800 p-4 ${Number(totalPages) === currentPage && 'opacity-25 cursor-not-allowed'}`}
                onClick={() => {
                    setOffset(currentPage + 1)
                    navigate(`?page=${currentPage + 1}`)
                }}
            >Next
            </button>

        </div>
    )
}

export default ListButtons