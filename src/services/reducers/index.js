import { combineReducers } from "redux";
import { burgerReducer } from "./burger";
import { foodsReducer } from './foods';

export const rootReducer = combineReducers({
    burger: burgerReducer,
    foods: foodsReducer
});
