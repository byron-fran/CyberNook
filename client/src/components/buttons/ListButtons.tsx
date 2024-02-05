

interface ListButtonsProps {
    currentPage: number,
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>,
    totalPages: number,
    pageButtons: () => number[]
}

const ListButtons = ({ currentPage, setCurrentPage, totalPages, pageButtons }: ListButtonsProps) => {
    return (
        <div className='mt-6 flex justify-center items-center gap-4'>
            {currentPage !== 1 && (
                <button
                    className='border border-slate-300 p-2 rounded-md'
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(1)}
                >Back</button>
            )}

            {pageButtons()?.map((button, index) => {
                return (
                    <div key={index}>
                        <button
                            className={`${currentPage !== button ? 'border border-slate-300 p-2 rounded-md' : 'bg-blue-800 text-white p-2 rounded-md'}`}
                            disabled={button === currentPage}
                            onClick={() => setCurrentPage(button)}>{button}</button>
                    </div>
                )
            })}

            {currentPage !== totalPages && (
                <button
                    className='border border-slate-300 p-2 rounded-md'
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >Next</button>
            )}
            {totalPages !== 1 && (
                <button
                    className='border border-slate-300 p-2 rounded-md'
                    disabled={currentPage === totalPages}
                    onClick={() => {
                        setCurrentPage(totalPages)
                    }}
                >Last</button>
            )}
        </div>
    )
}

export default ListButtons