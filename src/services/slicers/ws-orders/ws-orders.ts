import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersWsState, TOrdersWsPayload } from './ws-orders-types';
import { getFullOrders } from '../../../utils/helpers';

const initialOrdersWs: TOrdersWsState = {
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

        wsGetOrders: (state, action: PayloadAction<TOrdersWsPayload>) => {
            const { parsedData, foods } = action.payload;
            state.success = true;
            state.orders = getFullOrders(parsedData.orders!, foods);
        }
    }
})

const { reducer, actions } = profileSlice;
const { wsError, wsSuccess, wsClosed, wsGetOrders } = actions;

export {
    reducer as wsOrdersReducer,
    wsError, wsSuccess, wsClosed, wsGetOrders,
    initialOrdersWs
}
