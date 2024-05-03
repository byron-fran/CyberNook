import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks/hooks';
import { getUserProfileThunk } from './redux/thunks/AuthThunk';
import { getAllOrdersThunk } from './redux/thunks/CartThunks';
import { getProductsThunk } from './redux/thunks/ProductsThunk';
import { getListCategories } from './redux/thunks/CategoryThunks';
import { getAllMarks } from './redux/thunks/MarksThunk';
import { getAllReviewsThunk } from './redux/thunks/ReviewsThunk';
import { getAllProductsThunk } from './redux/thunks/ProductsThunk';
import { getAddressThunk } from './redux/thunks/AddressThunk';
import { AppRoutes } from './routes/AppRoutes';

function App(): JSX.Element {

  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token')
  const { isAuthenticated } = useAppSelector(state => state.auth)

  useEffect(() => {

    dispatch(getProductsThunk({ offset: 1 }))
    dispatch(getListCategories());
    dispatch(getAllMarks())
    dispatch(getAllProductsThunk())
    dispatch(getAllReviewsThunk())

  }, [dispatch]);

  
  useEffect(() => {

    if (token) {
      dispatch(getUserProfileThunk());
      dispatch(getAllOrdersThunk())
      dispatch(getAddressThunk())
      return
    }
  }, [dispatch, isAuthenticated])


  return (
    <>
      <AppRoutes  />
    </>
  )
}

export default App
