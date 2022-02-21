import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { ActionCreator } from '@reduxjs/toolkit'

import { rootReducer, allActions } from '../index';
import {store} from '../../index';

type SliceActions<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never;
}[keyof T]

export type TActions = SliceActions<typeof allActions>

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type GetState = typeof store.getState;
export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TActions>
>;

