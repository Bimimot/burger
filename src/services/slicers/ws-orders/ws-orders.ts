import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersWsState } from './ws-orders-types';

const initialOrdersWs:TOrdersWsState = {
    success: false,
    isError: false,
    orders: null
};

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

        wsGetOrders: (state, action: PayloadAction<TOrdersWsState>) => action.payload
    }
})


const { reducer, actions } = profileSlice;
const { wsError, wsSuccess, wsClosed, wsGetOrders } = actions;

export {
    reducer as wsOrdersReducer,
    wsError, wsSuccess, wsClosed, wsGetOrders,
    initialOrdersWs
}


