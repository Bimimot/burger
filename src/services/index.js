import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';
import { burgerReducer } from "./slicers/burger";
import { ordersReducer } from "./slicers/orders";
import { ingredientReducer } from "./slicers/ingredient";

export const rootReducer = combineReducers({
    foods: foodsReducer,
    burger: burgerReducer,
    orders: ordersReducer,
    ingredient: ingredientReducer
});
