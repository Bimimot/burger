import {
    wsOrdersReducer,
    wsError, wsSuccess, wsClosed, wsGetOrders,
    initialOrdersWs
} from './ws-orders';



test('WsOrder reducer return the initial state', () => {
    expect(wsOrdersReducer(undefined, {})).toEqual(initialOrdersWs)
});

test('WsOrder reducer error', () => {
    const previousState = initialOrdersWs;
    expect(wsOrdersReducer(previousState, wsError())).toEqual(
        {
            ...previousState,
            success: false,
            isError: true
        })
});

test('WsOrder reducer success', () => {
    const previousState = initialOrdersWs;
    expect(wsOrdersReducer(previousState, wsSuccess())).toEqual(
        {
            ...previousState,
            success: true
        })
});

test('WsOrder reducer close', () => {
    const previousState = { ...initialOrdersWs, success: true };
    expect(wsOrdersReducer(previousState, wsClosed())).toEqual(
        {
            ...previousState,
            success: false
        })
});


test('WsOrder reducer getOrders', () => {
    const previousState = { ...initialOrdersWs, success: true };
    const payload = {
        parsedData: {
            success: true,
            orders: [
                { id: "a", ingredients: ["01", "02"] },
            ]
        },
        foods: [
            { _id: "01", content: "aaaa" },
            { _id: "02", content: "abab" }
        ]
    };
    const readyOrders = [
        {
            id: "a",
            ingredients: [
                { _id: "01", content: "aaaa" },
                { _id: "02", content: "abab" }
            ]
        }
    ];
    expect(wsOrdersReducer(previousState, wsGetOrders(payload)))
        .toEqual({
            ...previousState,
            success: true,
            orders: readyOrders,
        })
});