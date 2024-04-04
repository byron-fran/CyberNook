import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { getUserProfileThunk } from './redux/thunks/AuthThunk';
import { getAllOrdersThunk } from './redux/thunks/CartThunks';
import { getProductsThunk } from './redux/thunks/ProductsThunk';
import { getListCategories } from './redux/thunks/CategoryThunks';
import { getAllMarks } from './redux/thunks/MarksThunk';
import { getAllReviewsThunk } from './redux/thunks/ReviewsThunk';
import { getAllProductsThunk } from './redux/thunks/ProductsThunk';
import { AppRoutes } from './routes/AppRoutes';

function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')
  const [loading, setLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAppSelector(state => state.auth)

  //get user profile
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      dispatch(getProductsThunk(1))
      dispatch(getListCategories());
      dispatch(getAllMarks())
      dispatch(getAllProductsThunk())
      setLoading(false);
      dispatch(getAllReviewsThunk())
    }
    fetchData()

  }, [dispatch]);

  useEffect(() => {

    if (token) {
      dispatch(getUserProfileThunk(token));
      dispatch(getAllOrdersThunk(token))
      return
    }
  }, [dispatch, isAuthenticated])


  return (
    <>
      <AppRoutes loading={loading} />
    </>
  )
}

export default App
