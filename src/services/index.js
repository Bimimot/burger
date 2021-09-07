import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';
import { burgerReducer } from "./slicers/burger";
import { ordersReducer } from "./slicers/orders";

export const rootReducer = combineReducers({
    foods: foodsReducer,
    burger: burgerReducer,
    orders: ordersReducer
});
