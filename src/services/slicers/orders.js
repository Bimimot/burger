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
            state.openDetails = true;
            state.isLoading = true;
            state.isError = false
        },
        orderError: (state) => {
            state.isLoading = true;
            state.isError = true
        },
        orderSuccess: (state, action) => {
            state.items = [...state.items, action.payload];
            state.currentNumber = action.payload.number;
            state.isLoading = false;
            state.isError = false
        }
    },
});


const { actions, reducer } = ordersSlice;
const { orderLoading, orderError, orderSuccess } = actions;


function getOrderNumber(arrId) {
    return function (dispatch, getState) {
        dispatch(orderLoading());
        const { totalPrice, recipe } = getState().burger;
        loadOrderNumber(arrId)
            .then(result => dispatch(
                orderSuccess({
                    ...result,
                    number: result.order.number,
                    totalPrice,
                    recipe
                }))
            )
            .catch(e => {
                console.log("Error with order:", e);
                dispatch(orderError())
            })
    }
};


export { reducer as ordersReducer, getOrderNumber };