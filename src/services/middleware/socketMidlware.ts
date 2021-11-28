import type { Middleware, MiddlewareAPI } from 'redux';
import type { TActions, AppDispatch, RootState } from '../types/store-types';
import type { Torder, Tburger, TwsActions } from '../../utils/proptypes';
import { getCookie } from '../../utils/helpers';

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions, isToken: Boolean): Middleware => {
    // const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return next => (action: TActions) => {
            const { dispatch, getState } = store;
            const { type } = action;
            const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;

            const foods = getState().foods.items;

            if (type === wsInit) {
                socket = new WebSocket(isToken ? wsUrl + '?token=' + getCookie('accessToken') : wsUrl);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = event => {
                    dispatch({ type: onError });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const fullOrders = parsedData.orders.map((order: Torder) => ({
                        ...order,
                        ingredients: order.ingredients.map(ingredient =>
                            foods.find(food => ingredient === food._id))
                            .filter(ingredient => !!ingredient)
                    }));

                    dispatch({
                        type: onMessage,
                        payload: {
                            ...parsedData,
                            success: true,
                            orders: fullOrders.map((order: Tburger) => (
                                {
                                    ...order,
                                    total: order.ingredients.reduce((total, current) =>
                                        total + current.price * (current.type === "bun" ? 2 : 1), 0)
                                }))
                        }
                    });
                }

                socket.onclose = event => {
                    dispatch({ type: onClose });
                };
            }

            next(action);
        };
    }) as Middleware;
};

