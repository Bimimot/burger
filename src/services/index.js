import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';
import { burgerReducer } from "./slicers/burger";

export const rootReducer = combineReducers({
    foods: foodsReducer,
    burger: burgerReducer
});
