// import { FOODS_LOADING, FOODS_SUCCESS, FOODS_ERROR } from '../actions/foods';
// import { createReducer } from '@reduxjs/toolkit';

// const initialFoods = {
//     items: [],
//     isLoading: false,
//     isError: false
// };


// // ----- toolkit REDUX ---createReduce-----
// export const foodsReducer = createReducer(initialFoods, (builder) => {
//     builder
//         .addCase(FOODS_LOADING, (state, action) => {
//             state.isLoading = true;
//             state.isError = false
//         })
//         .addCase(FOODS_SUCCESS, (state, action) => {
//             state.items = action.payload.items;
//             state.isLoading = false;
//             state.isError = false
//         })
//         .addCase(FOODS_ERROR, (state, action) => {
//             state.isLoading = false;
//             state.isError= true
//         })
// })


//------pure REDUX -----

// export const foodsReducer = (foods = initialFoods, action) => {
//     switch (action.type) {
//         case FOODS_LOADING: {
//             return {
//                 ...foods,
//                 isLoading: true,
//                 isError: false
//             };
//         }

//         case FOODS_SUCCESS: {
//             return {
//                 items: action.payload.items,
//                 isLoading: false,
//                 isError: false
//             };
//         }

//         case FOODS_ERROR: {
//             return {
//                 ...foods,
//                 isLoading: false,
//                 isError: true

//             };
//         }

//         default: {
//             return foods;
//         }
//     }
// }