import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import { formaterDinero } from '../../helpers';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Slides = () => {
    const { products } = useAppSelector(state => state.products);

    // sort products by created
    const sortedProducts = [...products].sort((a, b) => b.createdAt!.localeCompare(a.createdAt!));
    // limit search results to 5
    const firstFiveProducts = sortedProducts.slice(0, 10);
   



    return (
        <div className='w-full mt-10 bg-[url(/images/bg-destcado.jpg)] bg-black bg-opacity-60 bg-cover bg-left-top bg-no-repeat bg-blend-multiply '>
            <div className='grid md:grid-cols-4 p-8 gap-4'>
                <div className='col-span-1 text-white flex flex-col justify-center'>
                    <h2 className='text-3xl font-bold'>New releases</h2>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem mollitia sequi corrupti quae atque sed? Hic, dignissimos! Sint ipsam voluptas blanditiis</p>
                    

                </div>
                <div className='col-span-3'>
                    <Swiper
                        modules={[Virtual, Navigation, Pagination]}

                        slidesPerView={5}

                        spaceBetween={30}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        virtual

                        className='md:h-[300px] w-full'
                    >
                        {firstFiveProducts.map(product => {
                            return (
                                <SwiperSlide key={product.id} className='bg-white rounded-sm h-[150px] p-4 '>
                                    <img className='object-contain h-[100px] w-full mx-auto' src={product.image} />
                                    <p className='mt-4 font-bold h-[50px] line-clamp-2'>{product.name}</p>
                                    <p className='text-white bg-blue-800 font-bold p-2 rounded-sm mt-4'>{formaterDinero(product.price)}</p>
                                    <NavLink className='mt-4 hover:text-blue-800 hover:decoration-blue-800 hover:underline' to={`/detail/${product.id}`} >Shop now</NavLink>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>

            </div>

        </div>
    )
}

export default Slides