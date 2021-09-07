
// import { loadFoods } from "../../utils/api";
// import { createAction } from '@reduxjs/toolkit'

// export const FOODS_LOADING = "FOODS_LOADING";
// export const FOODS_SUCCESS = "FOODS_SUCCESS";
// export const FOODS_ERROR = "FOODS_ERROR";

// const foodsLoading = createAction(FOODS_LOADING);
// const foodsError = createAction(FOODS_ERROR);
// const foodsSuccess = createAction(FOODS_SUCCESS);

// export function getFoods () {
//     return function (dispatch) {
//         dispatch(foodsLoading);
//         loadFoods()
//             .then(result => dispatch(foodsSuccess({items: result.data})))
//             .catch(e => {
//                 console.log("Error:", e);
//                 dispatch(foodsError)
//             })
//  }
// }
