
export const socketFeedMiddleware = () => {
    const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

    return store => {
        let socket = null;

        return next => action => {
            const { dispatch, getState } = store;
            const { type } = action;
            const foods = getState().foods.items;

            if (type === "wsFeed/wsInit") {
                socket = new WebSocket(wsUrl);
            }
            if (socket) {
                socket.onopen = event => {
                    dispatch({ type: "wsFeed/wsSuccess" });
                };

                socket.onerror = event => {
                    dispatch({ type: "wsFeed/wsError" });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const fullOrders = parsedData.orders.map(order => ({
                        ...order,
                        ingredients: order.ingredients.map(ingredient =>
                            foods.find(food => ingredient === food._id))
                            .filter(ingredient => !!ingredient)
                    }));

                    dispatch({
                        type: "wsFeed/wsGetFeed",
                        payload: {
                            ...parsedData,
                            success: true,
                            orders: fullOrders.map(order => (
                                {
                                    ...order,
                                    total: order.ingredients.reduce((total, current) => total + current.price * (current.type === "bun" ? 2 : 1), 0)
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
