
import { loadFoods } from "../../utils/api";

export const FOODS_LOADING = "FOODS_LOADING";
export const FOODS_SUCCESS = "FOODS_SUCCESS";
export const FOODS_ERROR = "FOODS_ERROR";


export function getFoods () {
    return function (dispatch) {
        dispatch({type: FOODS_LOADING});
        loadFoods()
            .then(result => dispatch({
                type: FOODS_SUCCESS,
                items: result.data
            })
            )
            .catch(e => {
                console.log("Error:", e);
                dispatch({ type: FOODS_ERROR})
            })
 }
}
