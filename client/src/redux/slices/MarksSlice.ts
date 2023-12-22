import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { getAllMarks, getProductByMark } from "../thunks/MarksThunk"
import { ProductType } from "../../interface/Product"

interface Mark {
    name: string,
    id: number
}

type MarksType = {
    marks: Mark[],
    prodocustByMark: ProductType[],
    isLoading: boolean
}
const initialState: MarksType = {
    marks: [],
    isLoading: false,
    prodocustByMark: []
};

const MarkSclice = createSlice({
    name: 'marks',
    reducers: {},
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllMarks.pending, state => {
                state.isLoading = true
            })
            .addCase(getAllMarks.fulfilled, (state, action: PayloadAction<Mark[]>) => {
                state.isLoading = false
                state.marks = action.payload
            })
            .addCase(getAllMarks.rejected, state => {
                state.isLoading = false
            })
        builder
            .addCase(getProductByMark.pending, state => {
                state.isLoading = true
            })
            .addCase(getProductByMark.fulfilled, (state, action: PayloadAction<ProductType[]>) => {
                state.isLoading = false
                state.prodocustByMark = action.payload
            })
            .addCase(getProductByMark.rejected, state => {
                state.isLoading = false
            })
    }
});

export default MarkSclice