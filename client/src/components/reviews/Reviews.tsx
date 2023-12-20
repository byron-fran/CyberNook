import { FC, useEffect, useState } from 'react';
import { ProductType } from '../../interface/Product';
import { useForm } from 'react-hook-form'
import { Review } from '../../interface/Review';
import axios, { AxiosError } from 'axios';
import { useAppSelector } from '../../redux/hooks/hooks';

type ReviewsProps = {
    product: ProductType
}

const Reviews: FC<ReviewsProps> = ({ product: { id } }) => {

    const [reviews, setReviews] = useState<Review[]>([])
    const [valueStar, setValueStar] = useState<number>(0);
    const { handleSubmit, formState: { errors }, register, reset } = useForm<Review>();
    const { user } = useAppSelector(state => state.auth)


    const onSubmit = handleSubmit(async review => {
        review.ProductId = id;
        review.stars = valueStar;


        try {
            const { data } = await axios.post(`http://localhost:4000/review`, review, {
                withCredentials: true
            });
            return data

        }
        catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.log(error.response)
            }
            else {
                console.log(error)
            }
        }
        reset()
    })

    useEffect(() => {
        const getReviews = async () => {
            try {
                const { data } = await axios(`http://localhost:4000/reviews/${id}`);
                setReviews(data)
            }
            catch (error: unknown) {
                if (error instanceof AxiosError) {
                    console.log(error.response)
                }
            }
        }
        getReviews()
    }, [id]);


    const handleStarClick = (selectedStar: number) => {
        setValueStar(selectedStar === valueStar ? 0 : selectedStar);
    };

    return (
        <div className='w-[95%] md:w-[85%] mx-auto'>
            <h1 className='text-center text-2xl'>Reviews</h1>

            <section className='flex gap-2'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <img
                        key={star}
                        className={`w-[28px] cursor-pointer`}
                        src={`${star <= valueStar ? '/images/star2.png' : '/images/star.png'}`}
                        alt={`icon-star-${star}`}
                        onClick={() => handleStarClick(star)}
                    />
                ))}
            </section>
            {/* section form comment */}
            { }
            <section className='w-full'>

                <form action="" onSubmit={onSubmit}>
                    <div>
                        <label htmlFor="" className='block'>Add comment</label>
                        {errors.comment?.type === 'required' && (<p className='text-red-500 '>Comment not must be empty</p>)}
                        <textarea className='border border-slate-300 resize-none w-[200px] h-[200px]' id=""
                            {...register('comment', { required: true, minLength: 2, maxLength: 100 })}></textarea>
                    </div>
                    <button className='bg-blue-800 text-white p-2 rounded-md' type='submit'>Add comment</button>
                </form>


            </section>
            {/* section comment */}
            <section>
                {reviews && reviews?.map((review) => {
                    const { comment, stars, likes, } = review;

                    return (
                        <div className='mt-4 border border-slate-200 rounded-md' key={review.id}>
                            <div className='flex'>
                                {Array.from({ length: stars }, (_, i) => {

                                    return (

                                        <img key={i} className='w-[20px]' src="/images/star2.png" alt="star-icon" />

                                    )
                                })}
                                <p>{likes}</p>
                            </div>
                            <div className='flex justify-between items-center p-2'>
                                <p className='p-2'>{comment}</p>
                                <p className='font-bold text-blue-800'>-{review.User?.name}</p>
                            </div>


                        </div>
                    )
                })}
            </section>
        </div>
    );
};

export default Reviews;
