import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { TFeedWsState } from './ws-feed-types';

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
        wsGetFeed: (state, action: PayloadAction<TFeedWsState>) => action.payload
    }
})


const { reducer, actions } = profileSlice;
const { wsError, wsSuccess, wsClosed, wsGetFeed } = actions;

export {
    reducer as wsFeedReducer,
    wsError, wsSuccess, wsClosed, wsGetFeed,
    initialFeedWs
}