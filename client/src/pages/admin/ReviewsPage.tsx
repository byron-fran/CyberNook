import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks'
import { deleteReviewByIdThunk } from '../../redux/thunks/ReviewsThunk';


const ReviewsPage = () => {

  const { allReviews: reviews } = useAppSelector(state => state.reviews);
  const dispatch = useAppDispatch();

  const handleDeleteReviewById = (id: string) => {
    if (confirm('Are you sure you want to delete this review ?')) {
      dispatch(deleteReviewByIdThunk(id))
      return
    }

  }

  return (
    <>
      <main className='col-span-3  md:h-[80vh] no-scrollbar overflow-y-scroll w-full'>

        <div className='w-[90%] mx-auto mt-10 grid md:grid-cols-2 gap-4'>

          {reviews.length > 0 ? reviews?.map(review => {

            const date = new Date(review.updatedAt!).toLocaleDateString('es');

            return (
              <div key={review.id} className='border border-slate-200 p-2 shadow-md rounded-md'>
                <div className='flex items-center '>

                  <ul className='flex '>
                    {Array.from({ length: review.stars }, (_, index) => {

                      return <li key={index}><img className='w-[14px]' src="/images/star2.png" alt="icon-star" /></li>
                    })}
                  </ul>
                  <p className='ml-2 text-blue-800'>{review.User?.name}</p>
                </div>
                <div>
                  <p>{review.comment}</p>
                  <p className='font-bold  text-[12px] text-blue-800'>{date}</p>
                </div>
                <div className='flex justify-between gap-4 mt-4'>
                  <div className='flex gap-2'>
                    <p className='font-bold text-blue-800'>{review?.Product?.category}</p>
                    <p className='font-bold'>{review?.Product?.name}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteReviewById(review.id)}><img className='w-[20px]' src="/images/basura.png" alt="icon-trash" /></button>
                </div>
              </div>
            )
          }) : (<p className='text-center uppercase font-bold text-2xl col-span-2'>There are no reviews yet</p>)}
        </div>
      </main>
    </>
  )
}

export default ReviewsPage