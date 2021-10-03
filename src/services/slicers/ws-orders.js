import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';

const initialOrdersWs = {
    success: false,
    isError: false,
    orders: []
};;

const profileSlice = createSlice({
    name: 'wsOrders',
    initialState: initialOrdersWs,
    reducers: {
        wsError: (state) => {
            state.success = false;
            state.isError = true
        },
        wsSuccess: (state, action) => {
            state.success = true
        },
        wsClosed: (state, action) => {
            state.success = false
        },

        wsGetOrders: (state, action) => action.payload
    }
})


const { reducer, actions } = profileSlice;
const { wsError, wsSuccess, wsClosed, wsGetOrders } = actions;

export {
    reducer as wsOrdersReducer,
    wsError, wsSuccess, wsClosed, wsGetOrders
}

