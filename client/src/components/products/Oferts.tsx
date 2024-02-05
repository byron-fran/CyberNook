
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import { formaterDinero } from '../../helpers';
import { ProductType } from '../../interface/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Oferts = () => {
    const { products } = useAppSelector(state => state.products);

    // find product with greater offert
    const productGreaterOffert = products.reduce((prevProduct: ProductType, currentProduct) => {
        return prevProduct.discount > currentProduct.discount ? prevProduct : currentProduct;
    }, {} as ProductType);


    // filter products by offert > 10 percent
    const productsFilterByOffert = products.filter(product => {
        return product.discount >= 5 && product.discount < productGreaterOffert.discount
    });
    // limit search results to 3
    const productsFilterByOffertLimit = productsFilterByOffert.slice(0, 3);

    return (
        <>
            <main className='bg-blue-800 p-4 w-full bg-gradient-to-r from-blue-800 to-blue-600'>
                <div className='grid md:grid-cols-3 items-start'>
                    <section className='md:col-span-1 flex flex-col justify-center mb-4 px-2'>
                        <div>
                            <div className='w-full  px-2 h-[300px] lg:h-[300px]'>
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                        delay: 2500,
                                        disableOnInteraction: false,

                                    }}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    loop={true}
                                    navigation={true}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="w-[280px] sm:w-[500px] md:w-full h-full "
                                >

                                    <SwiperSlide className='w-full bg-[url(/icons/bg-1.jpg)]  bg-opacity-60 bg-blend-multiply bg-center bg-no-repeat bg-cover '>
                                        <div className='flex justify-center items-center w-full flex-col h-full'>
                                            <h2 className='text-white font-bold text-2xl text-center mb-2'>The best offers are here </h2>
                                            <p className='text-white text-center mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas architecto tenetur sit eos quidem nobis quam officia rem ab nam sunt, debitis magni at dolores eveniet voluptatibus ut, </p>
                                            <NavLink to='/oferts' className='bg-red-500 text-white font-bold p-2 rounded-md w-[80%] text-center mx-auto'>Go to offers</NavLink>
                                        </div>

                                    </SwiperSlide>
                                    <SwiperSlide className=' bg-[url(/icons/bg-2.jpg)]  bg-opacity-60 bg-blend-multiply bg-center bg-no-repeat bg-cover'>
                                        <div className='flex justify-center items-center w-full flex-col h-full'>
                                            <h2 className='text-white font-bold text-2xl text-center mb-2'>The best laptps </h2>
                                            <p className='text-white text-center mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas architecto tenetur sit eos quidem nobis quam officia rem ab nam sunt, debitis magni at dolores eveniet voluptatibus ut, </p>
                                            <NavLink to='/category/Laptop' className='bg-red-500 text-white font-bold p-2 rounded-md w-[80%] text-center mx-auto'>See laptops</NavLink>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className=' bg-[url(/icons/bg-3.jpg)]  bg-opacity-60 bg-blend-multiply bg-center bg-no-repeat bg-cover'>
                                        <div className='flex justify-center items-center w-full flex-col h-full'>
                                            <h2 className='text-white font-bold text-2xl text-center mb-2'>The best phones </h2>
                                            <p className='text-white text-center mb-2'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas architecto tenetur sit eos quidem nobis quam officia rem ab nam sunt, debitis magni at dolores eveniet voluptatibus ut, </p>
                                            <NavLink to='/category/Phone' className='bg-red-500 text-white font-bold p-2 rounded-md w-[80%] text-center mx-auto'>See phones</NavLink>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                            </div>
                        </div>

                        <p className='text-white font-bold text-2xl lg:text-5xl md:text-4xl mt-4'> Great deals happening right now</p>
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
                                <NavLink to={`/product/${productGreaterOffert.id}`} className='mt-20 bg-orange-500 text-white p-2 rounded-sm font-bold'>Shop now
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

                                        <NavLink to={`/product/${product.id}`}
                                            className='text-orange-500 '>Shop now</NavLink>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>


            </main>
        </>
    )
}

export default Oferts