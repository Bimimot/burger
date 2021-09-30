import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';
import { burgerReducer } from "./slicers/burger";
import { ordersReducer } from "./slicers/orders";
import { ingredientReducer } from "./slicers/ingredient";
import { headerReducer } from "./slicers/header";
import { profileReducer } from "./slicers/profile";
import { authFormReducer } from "./slicers/auth-form";

export const rootReducer = combineReducers({
    foods: foodsReducer,
    burger: burgerReducer,
    orders: ordersReducer,
    ingredient: ingredientReducer,
    header: headerReducer,
    profile: profileReducer,
    authForm: authFormReducer
});
