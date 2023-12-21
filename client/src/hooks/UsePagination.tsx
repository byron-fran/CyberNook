import { useEffect, useState } from 'react';
import { ProductType } from '../interface/Product';

const UsePagination = ( products : ProductType[]) => {

    const [productsPerPage, setProductsPerPage] = useState<ProductType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1)

    const data = Array.from({length : products?.length}, (_, index ) => index + 1);

    const itemsPerPage : number = 8;

    const totalPages = Math.ceil(data?.length / itemsPerPage);

    const getIndexRange = (page : number) => {
        const startPage = (page - 1) * itemsPerPage;
        const endPage = startPage + itemsPerPage;
        return [startPage, endPage]
    };

    useEffect(() => {
        const [startPage, endPage] = getIndexRange(currentPage);
        setProductsPerPage(products?.slice(startPage, endPage));

    }, [currentPage, products])

    const pageButtons = () => {
        const bottons: number[]  = [];
        const start = Math.max(1, currentPage, -2);
        const end = Math.min(totalPages, start + 5);

        for(let i =start; i <end; i++){
            bottons.push(i)
        }
        return bottons
    }
  return  {
    pageButtons,
    totalPages,
    productsPerPage,
    currentPage,
    setCurrentPage
  }
}

export default UsePagination