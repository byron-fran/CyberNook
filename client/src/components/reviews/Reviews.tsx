import { FC, useEffect, useState } from 'react';
import { ProductType } from '../../interface/Product';
import { useForm } from 'react-hook-form'
import { Review } from '../../interface/Review';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { createReviewThunk, getReviewsByProductThunk, clearReviewsThunk } from '../../redux/thunks/ReviewsThunk';


type ReviewsProps = {
    product: ProductType
}

const Reviews: FC<ReviewsProps> = ({ product }) => {


    const [valueStar, setValueStar] = useState<number>(0);
    const { handleSubmit, formState: { errors }, register, reset } = useForm<Review>();
    const { user, isAuthenticated } = useAppSelector(state => state.auth)
    const { reviews } = useAppSelector(state => state.reviews)
    const dispatch = useAppDispatch()
    const [foundComment, setFoundCommet] = useState(false);


    const onSubmit = handleSubmit(async review => {
        review.ProductId = product?.id;
        review.stars = valueStar;

        dispatch(createReviewThunk(review))
            .then(() => {
                setFoundCommet(true)
            })
            .catch(() => {
                setFoundCommet(false)
            })
        reset()
    });

    const handleStarClick = (selectedStar: number) => {
        setValueStar(selectedStar === valueStar ? 0 : selectedStar);
    };

    useEffect(() => {

        dispatch(getReviewsByProductThunk(product?.id))

        return () => {
            dispatch(clearReviewsThunk())
        }
    }, [product?.id, dispatch, foundComment]);

    useEffect(() => {
        for (let i = 0; i < reviews?.length; i++) {
            if (reviews[i].User?.id === user.id) {
                setFoundCommet(true)

            }

        }
        return () => {
            setFoundCommet(false)
        }

    }, [foundComment, reviews, user.id])

    return (
        <div className='w-[95%] md:w-[85%] mx-auto'>
            <h1 className='text-center text-2xl'>Reviews</h1>

            {!foundComment && (
                <>
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

                    <section className='w-full'>

                        <form action="" onSubmit={onSubmit}>
                            <div>
                                <label htmlFor="" className='block'>Add comment</label>
                                {errors.comment?.type === 'required' && (<p className='text-red-500 '>Comment not must be empty</p>)}
                                <textarea className='border border-slate-300 resize-none w-[200px] h-[200px]' id=""
                                    {...register('comment', { required: true, minLength: 2, maxLength: 100 })}></textarea>
                            </div>
                            <button className={`bg-blue-800 ${isAuthenticated ? ' cursor-pointer' : 'opacity-70  cursor-not-allowed'} text-white p-2 rounded-md`} type='submit' disabled={isAuthenticated ? false : true}>Add comment</button>
                        </form>


                    </section>
                </>
            )}
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
