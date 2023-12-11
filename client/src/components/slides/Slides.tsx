import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Slides = () => {

    return (
        <div className='w-full mt-10'>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                loop={true}
                autoplay={{
                    delay: 2500
                }}

                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination, Autoplay]}
                className=" h-[30rem]"
            >
                <SwiperSlide className='bg-white'>
                    <img className='object-contain h-full mx-auto' src="/images/slides/camara1.jpg" />
                </SwiperSlide>
                <SwiperSlide  className='bg-white'>
                    <img className='object-contain h-full mx-auto' src="/images/slides/laptop-12.jpg" />
                </SwiperSlide>
                <SwiperSlide  className='bg-white'>
                    <img className='object-contain h-full mx-auto' src="/images/slides/monitor1.jpg" />
                </SwiperSlide>
                <SwiperSlide className='bg-white'>
                    <img className='object-contain h-full mx-auto' src="/images/slides/samsungnote20.jpg" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Slides