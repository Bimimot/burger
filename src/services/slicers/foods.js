import { createSlice } from '@reduxjs/toolkit';
import { loadFoods } from '../../utils/api';

const initialFoods = {
    items: [],
    isLoading: false,
    isError: false
};

const foodsSlice = createSlice({
    name: 'foods',
    initialState: initialFoods,
    reducers: {
        foodsLoading: (state) => {
            state.isLoading = true;
            state.isError = false
        },
        foodsError: (state) => {
            state.isLoading = false;
            state.isError = true
        },
        foodsSuccess: (state, action) => {
            state.items = action.payload.items;
            state.isLoading = false;
            state.isError = false
        }
    },
});

const { actions, reducer } = foodsSlice;
const { foodsLoading, foodsError, foodsSuccess } = actions;

function getFoods() {
    return function (dispatch) {
        dispatch(foodsLoading());
        loadFoods()
            .then(result => dispatch(foodsSuccess({ items: result.data })))
            .catch(e => {
                console.log("Error with ingredients:", e);
                dispatch(foodsError())
            })
    }
};


export {reducer as foodsReducer, getFoods};