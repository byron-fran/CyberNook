import { useEffect, useMemo, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks/hooks';
import { NavLink, useLocation } from 'react-router-dom';
import { getProductsThunk } from '../redux/thunks/ProductsThunk';


const UsePagination = () => {

    const { products, totalItems } = useAppSelector(state => state.products);
    const { search } = useLocation();
    const dispatch = useAppDispatch();

    let query = useMemo(() => new URLSearchParams(search), [search]);
    let page = Number(query.get('page'));

    const maxButtons = 5; // Máximo de botones de paginación a mostrar

    const [offset, setOffset] = useState(page ? page : 1)
    const [currentPage, setCurrentPage] = useState<number>(offset ? offset : 1)
    const totalPages = Math.ceil(totalItems / (products.length === 10 ? 10 : totalItems));

    const calculatePaginationIndexes = () => {
        const halfMaxButtons = Math.floor(maxButtons / 2);
        let start = Math.max(1, currentPage - halfMaxButtons);
        let end = Math.min(totalPages, start + maxButtons - 1);

        if (end - start + 1 < maxButtons) {
            start = Math.max(1, end - maxButtons + 1);
        }

        return { start, end };
    }

    // Generar los botones de paginación dinámicamente
    const renderPaginationButtons = () => {
        const { start, end } = calculatePaginationIndexes();

        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(
                <NavLink
                    to={`?page=${i}`}
                    key={i}
                    className={`${currentPage === i ? 'bg-blue-800 p-4 text-white' : ' border border-blue-800 p-4 '} `}
                    onClick={() => setOffset(i)}
                >
                    {i}
                </NavLink>
            );
        }

        return buttons;
    };

    useEffect(() => {
        if (offset) {
            dispatch(getProductsThunk(Number(offset)));
            return
        }
    }, [offset]);
 
    return {
        renderPaginationButtons,
        setCurrentPage,
        products,
        setOffset,
        totalPages,
        currentPage,
        

    }
}

export default UsePagination