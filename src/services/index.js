import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods';
import { burgerReducer } from "./slicers/burger-constructor";
import { ordersReducer } from "./slicers/orders";
import { ingredientReducer } from "./slicers/ingredient";
import { headerReducer } from "./slicers/header";
import { profileReducer } from "./slicers/profile";
import { authFormReducer } from "./slicers/auth-form";
import { burgerOrderReducer } from "./slicers/burger-order";
import { wsFeedReducer } from "./slicers/ws-feed";
import { wsOrdersReducer } from "./slicers/ws-orders";

export const rootReducer = combineReducers({
    foods: foodsReducer,
    burger: burgerReducer,
    orders: ordersReducer,
    ingredient: ingredientReducer,
    header: headerReducer,
    profile: profileReducer,
    authForm: authFormReducer,
    burgerOrder: burgerOrderReducer,
    wsFeed: wsFeedReducer,
    wsOrders: wsOrdersReducer
});
