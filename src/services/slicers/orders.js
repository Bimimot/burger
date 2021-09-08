import { createSlice } from '@reduxjs/toolkit';
import { loadOrderNumber } from '../../utils/api';

const initialOrders = {
    items: [],
    isLoading: false,
    isError: false,
    openDetails: false,
    currentNumber: null
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrders,
    reducers: {
        closeDetails: (state) => {
            state.openDetails = false;
            state.currentNumber = null
        },
        orderLoading: (state) => {
            console.log("Order loading");
            state.openDetails = true;
            state.isLoading = true;
            state.isError = false
        },
        orderError: (state) => {
            state.isLoading = true;
            state.isError = true
        },
        orderSuccess: (state, action) => {
            state.items = [...state.items, action.payload.order.number];
            state.currentNumber = action.payload.order.number;
            state.isLoading = false;
            state.isError = false
        }
    },
});


const { actions, reducer } = ordersSlice;
const { orderLoading, orderError, orderSuccess } = actions;


function getOrderNumber(arrId) {
    return function (dispatch) {
        dispatch(orderLoading());
        loadOrderNumber(arrId)
            .then(result => dispatch(orderSuccess(result)))
            .catch(e => {
                console.log("Error with order:", e);
                dispatch(orderError())
            })
    }
};


export { reducer as ordersReducer, getOrderNumber };