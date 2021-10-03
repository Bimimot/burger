import { getCookie } from "../../utils/helpers";

export const socketOrdersMiddleware = () => {
    //const token = getCookie('accessToken');
    const wsUrl = "wss://norma.nomoreparties.space/orders?token=";

    return store => {
        let socket = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type } = action;
            const foods = getState().foods.items;

            if (type === "wsOrders/wsInit") {
                socket = new WebSocket(wsUrl + getCookie('accessToken'));
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: "wsOrders/wsSuccess" });
                };

                socket.onerror = event => {
                    dispatch({ type: "wsOrders/wsError" });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const fullOrders = parsedData.orders.map(order => ({
                        ...order,
                        ingredients: order.ingredients.map(ingredient =>
                            foods.find(food => ingredient === food._id))
                    }));
                    dispatch({
                        type: "wsOrders/wsGetOrders",
                        payload: {
                            ...parsedData,
                            success: true,
                            orders: fullOrders.map(order => (
                                {
                                    ...order,
                                    total: order.ingredients.reduce((total, current) => total + current.price * (current.type === "bun" ? 2 :1), 0)
                                }))
                        }
                    });
                };

                socket.onclose = event => {
                    dispatch({ type: "wsFeed/wsClosed" });
                };
            }

            next(action);
        };
    };
};
