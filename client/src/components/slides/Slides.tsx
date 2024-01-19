import { Virtual, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, } from 'swiper/react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks/hooks';
import { formaterDinero } from '../../helpers';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect, useState , } from 'react';

const Slides = () => {
    const { products } = useAppSelector(state => state.products);
    const [widthMobile, setWidthMobile] = useState<boolean>(window.innerWidth < 768);

    // sort products by created
    const sortedProducts = [...products].sort((a, b) => b.createdAt!.localeCompare(a.createdAt!));
    // limit search results to 5
    const firstFiveProducts = sortedProducts.slice(0, 10);
   


    useEffect(() => {
        const handleResize = () => {
            setWidthMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        // Limpieza del event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
 
    return (
        <div className='w-full mt-10 bg-[url(/images/bg-destcado.jpg)] bg-black bg-opacity-60 bg-cover bg-left-top bg-no-repeat bg-blend-multiply '>
            <div className='grid md:grid-cols-4 p-8 gap-4'>
                <div className='md:col-span-1 text-white flex flex-col justify-center'>
                    <h2 className='text-3xl font-bold text-center md:text-left'>New releases</h2>
                    <p className='text-center md:text-left'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem mollitia sequi corrupti quae atque sed? Hic, dignissimos! Sint ipsam voluptas blanditiis</p>
                    

                </div>
                <div className='md:col-span-3'>
                    <Swiper
                       
                        modules={[Virtual, Navigation, Pagination]}
                        slidesPerView={widthMobile ? 2 : 5}
                        spaceBetween={30}
                        pagination={{
                            type: 'fraction',
                        }}
                        navigation={true}
                        virtual

                        className='md:h-[300px] w-[270px] sm:w-[400px] md:w-full'
                    >
                        {firstFiveProducts.map(product => {
                            return (
                                <SwiperSlide key={product.id} className='bg-white rounded-sm h-[150px] p-4 '>
                                    <img className='object-contain h-[100px] w-full mx-auto' src={product.image} />
                                    <p className='mt-4 font-bold h-[50px] line-clamp-2'>{product.name}</p>
                                    <p className='text-white bg-blue-800 font-bold p-2 rounded-sm mt-4 text-[10px] lg:text-[20px]'>{formaterDinero(product.price)}</p>
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