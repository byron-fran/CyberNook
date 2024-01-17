import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import { formaterDinero } from '../../helpers';
import { ProductType } from '../../interface/Product';

const Oferts = () => {
    const { products } = useAppSelector(state => state.products);

    // find product with greater offert
    const productGreaterOffert = products.reduce((prevProduct : ProductType, currentProduct) => {
        return prevProduct.discount > currentProduct.discount ? prevProduct : currentProduct;
      }, {} as ProductType);
      

    // filter products by offert > 10 percent
    const productsFilterByOffert = products.filter(product =>{ 
        return product.discount >= 5 && product.discount < productGreaterOffert.discount});
    // limit search results to 3
    const productsFilterByOffertLimit = productsFilterByOffert.slice(0, 3);

    return (
        <>
            <main className='bg-blue-800 p-4 w-full bg-gradient-to-r from-blue-800 to-blue-600'>
                <div className='grid md:grid-cols-3'>
                    <section className='md:col-span-1 flex flex-col justify-center my-8 p-2'>
                        <NavLink to='/oferts' className='text-white font-bold bg-red-700 mb-4  none md:inline-block w-[150px] p-4 rounded-md md:text-2xl'>Top deals</NavLink>
                        <p className='text-white font-bold text-2xl lg:text-6xl md:text-4xl mt-4'> Great deals happening right now</p>
                        <NavLink to='/store' className='bg-orange-500 hover:bg-orange-600 inline-block w-[100px] cursor-pointer text-white font-bold p-2  rounded-md mt-10'>Shop now</NavLink>
                    </section>
                    <section className='md:col-span-2'>
                        <div className=' gap-4 bg-white flex flex-col md:flex-row p-4 justify-evenly rounded-sm'>
                            <img 
                                src={productGreaterOffert.image} alt="hero" 
                                className='w-full object-contain h-[200px] md:w-[200px]' />
                            <div className='text-black p-4'>
                                <p className='font-bold'>{productGreaterOffert.name}</p>
                                <p className='text-sm line-clamp-5 my-4'>{productGreaterOffert.description}</p>
                                <NavLink to={`/detail/${productGreaterOffert.id}`} className='mt-20 bg-orange-500 text-white p-2 rounded-sm font-bold'>Shop now 
                                 and save {productGreaterOffert.discount} %</NavLink>
                            </div>

                        </div>
                        <div className='grid md:grid-cols-4 gap-4'>
                            {productsFilterByOffertLimit.map(product => { 
                                const save = (product.price * product.discount) / 100;
                               
                                return (
                                <div key={product.id} className='mt-8 p-4 bg-white rounded-sm last-of-type:col-span-2 flex flex-col items-center'>
                                    <img className='w-full object-contain h-[100px]  md:w-[150px]'
                                        src={product.image} alt={product.name} />
                                    <p className='mt-4 font-bold'>{product.name}
                                        <span className='text-blue-800 block font-extrabold text-lg'> Save up {formaterDinero(save)}</span></p>

                                    <NavLink to={`/detail/${product.id}`}
                                        className='text-orange-500 '>Shop now</NavLink>
                                </div>
                            )})}
                        </div>
                    </section>
                </div>


            </main>
        </>
    )
}

export default Oferts