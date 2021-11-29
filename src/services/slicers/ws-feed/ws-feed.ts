import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TFeedWsState, TFeedWsPayload } from './ws-feed-types';
import {getFullOrders} from '../../../utils/helpers';

const initialFeedWs: TFeedWsState = {
    success: false,
    isError: false,
    orders: null,
    total: 0,
    totalToday: 0
};;

const profileSlice = createSlice({
    name: 'wsFeed',
    initialState: initialFeedWs,
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
        wsGetFeed: (state, action: PayloadAction<TFeedWsPayload>) => {
            const { parsedData, foods } = action.payload;
            state.success = true;
            state.orders = getFullOrders(parsedData.orders!, foods);
            state.total = parsedData.total;
            state.totalToday = parsedData.totalToday;            
        }
    }
})


const { reducer, actions } = profileSlice;
const { wsError, wsSuccess, wsClosed, wsGetFeed } = actions;

export {
    reducer as wsFeedReducer,
    wsError, wsSuccess, wsClosed, wsGetFeed,
    initialFeedWs
}