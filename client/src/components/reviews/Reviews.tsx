import { FC, Fragment, useEffect, useState } from 'react';
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
            <h1 className='text-center text-2xl'>Reviews: {reviews?.length}</h1>

            {!foundComment && (
                <>
                    <section className='flex gap-2 justify-center items-center my-4 mx-auto '>
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

                        <form action="" className='w-full mx-auto flex flex-col items-center justify-center'
                            onSubmit={onSubmit}>
                            <div className='w-full mx-auto'>
                                <label htmlFor="" className='block text-center mb-2'>Add comment</label>
                                {errors.comment?.type === 'required' && (<p className='text-red-500 '>Comment not must be empty</p>)}
                                <textarea className='border border-slate-300 resize-none w-full md:w-[50%]  h-[200px] mx-auto block focus:outline-blue-800 p-2' id=""
                                    {...register('comment', { required: true, minLength: 2, maxLength: 200 })}></textarea>
                            </div>
                            <button className={`bg-blue-800 ${isAuthenticated ? ' cursor-pointer' : 'opacity-70  cursor-not-allowed'} text-white p-2 rounded-md mt-4 w-full md:w-[50%] `} type='submit' disabled={isAuthenticated ? false : true}>Add comment</button>
                        </form>


                    </section>
                </>
            )}
            {/* section comment */}
            <section>
                {reviews && reviews?.map((review) => {
                    
                    const { comment, stars, likes, } = review;

                    return (
                        <div className='mt-8 border border-slate-200 rounded-md w-full md:w-[50%] mx-auto ' key={review.id}>
                            <div className='flex items-center mt-2 ml-2'>
                                <svg className='w-[40px]' color='#1e40af' fill='#1e40af' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" id="profile">
                                    <g data-name="Layer 3">
                                        <path d="M32,3A29,29,0,0,0,12.28,53.24l1.9-1c2.92-1.56,7.71-4.12,8.69-4.73a3.22,3.22,0,0,0,1.69-2.23V42.06a19.42,19.42,0,0,1-3.35-6.79.37.37,0,0,0-.12-.2,3.46,3.46,0,0,1-1.34-2.34l0-5.08a4.57,4.57,0,0,1,.75-1.52.81.81,0,0,0,.16-.34V20.16A8,8,0,0,1,23,14.41c2.09-2,5.1-3.06,9-3.06s6.85,1,9,3.06a8,8,0,0,1,2.35,5.75v5.63a.81.81,0,0,0,.18.36,4.17,4.17,0,0,1,.73,1.5l0,.25v4.83a3.49,3.49,0,0,1-1.36,2.36.35.35,0,0,0-.09.16,19.34,19.34,0,0,1-3.36,6.81v3.23a3.25,3.25,0,0,0,1.69,2.23c1,.61,5.77,3.16,8.71,4.72l1.89,1A29,29,0,0,0,32,3Z">
                                        </path>
                                        <path d="M40.06,49.21a5.07,5.07,0,0,1-2.63-3.92v-4l.26-.28a16.79,16.79,0,0,0,3.16-6.29,2.41,2.41,0,0,1,.68-1.13,2.32,2.32,0,0,0,.71-.9V28a2,2,0,0,0-.33-.65,2.61,2.61,0,0,1-.61-1.6V20.16a6,6,0,0,0-1.74-4.31c-1.71-1.66-4.26-2.5-7.56-2.5s-5.85.84-7.56,2.5a6,6,0,0,0-1.75,4.31v5.63a2.55,2.55,0,0,1-.59,1.58,2.41,2.41,0,0,0-.35.67v4.69a2.41,2.41,0,0,0,.69.86,2.35,2.35,0,0,1,.7,1.16A16.89,16.89,0,0,0,26.31,41l.25.28v4a5.08,5.08,0,0,1-2.63,3.92c-1,.6-5.12,2.84-8.08,4.41l-1.94,1a28.92,28.92,0,0,0,36.19,0l-1.94-1C45.2,52,41,49.81,40.06,49.21Z">
                                        </path>
                                    </g>
                                </svg>
                                <p className='font-bold text-blue-800 ml-2 '>{review.User?.name}</p>

                            </div>

                            <div className='flex mx-auto  '>

                                {Array.from({ length: stars }, (_, i) => {

                                    return (
                                        <Fragment key={i}>

                                            <img className='w-[20px] ml-2 mt-2' src="/images/star2.png" alt="star-icon" />

                                        </Fragment>


                                    )
                                })}
                                <p>{likes}</p>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p className='p-2'>{comment}</p>
                            </div>


                        </div>
                    )
                })}
            </section>
        </div>
    );
};

export default Reviews;
