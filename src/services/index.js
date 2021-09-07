import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';

export const rootReducer = combineReducers({
    foods: foodsReducer
});
