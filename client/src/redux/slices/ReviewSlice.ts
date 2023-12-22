import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Review } from "../../interface/Review";
import {
    createReviewThunk,
    getReviewsByProductThunk,
    clearReviewsThunk,
    getAllReviewsThunk,
    deleteReviewByIdThunk
} from "../thunks/ReviewsThunk";

type ReviewType = {
    reviews: Review[],
    isLoading: boolean,
    allReviews: Review[]
};


const initialState: ReviewType = {
    reviews: [],
    isLoading: false,
    allReviews: []
};


const ReviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder
            .addCase(getReviewsByProductThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getReviewsByProductThunk.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.isLoading = false
                state.reviews = action.payload
            })
            .addCase(getReviewsByProductThunk.rejected, state => {
                state.isLoading = false
            })

        //get all reviews
        builder
            .addCase(getAllReviewsThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllReviewsThunk.fulfilled, (state, action: PayloadAction<Review[]>) => {
                state.isLoading = false
                state.allReviews = action.payload
            })
        builder
            .addCase(createReviewThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(createReviewThunk.fulfilled, (state, action: PayloadAction<Review>) => {
                state.isLoading = false
                state.reviews.push(action.payload)
            })
            .addCase(createReviewThunk.rejected, state => {
                state.isLoading = false
            })
        //Delete review
        builder
            .addCase(deleteReviewByIdThunk.pending, state => {
                state.isLoading = true
            })
            .addCase(deleteReviewByIdThunk.fulfilled, (state, action) => {
              
                const reviewsFilters = state.allReviews.filter(review => review.id !== action.payload)
                state.allReviews = reviewsFilters
                state.isLoading = false

            })
            .addCase(deleteReviewByIdThunk.rejected, state => {
                state.isLoading = false
            })
        builder
            .addCase(clearReviewsThunk.pending, state => {
                state.isLoading = false
            })
            .addCase(clearReviewsThunk.fulfilled, state => {
                state.reviews = []
                state.isLoading = false
            })
    }
})
export default ReviewSlice