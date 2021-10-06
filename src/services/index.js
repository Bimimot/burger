import { combineReducers } from "redux";
import { foodsReducer } from './slicers/foods/foods';
import { burgerReducer } from "./slicers/burger-constructor/burger-constructor";
import { ordersReducer } from "./slicers/orders/orders";
import { ingredientReducer } from "./slicers/ingredient/ingredient";
import { headerReducer } from "./slicers/header/header";
import { profileReducer } from "./slicers/profile/profile";
import { authFormReducer } from "./slicers/auth-form/auth-form";
import { burgerOrderReducer } from "./slicers/burger-order/burger-order";
import { wsFeedReducer } from "./slicers/ws-feed/ws-feed";
import { wsOrdersReducer } from "./slicers/ws-orders/ws-orders";

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
