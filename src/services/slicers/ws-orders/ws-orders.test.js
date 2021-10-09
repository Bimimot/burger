import {
    wsOrdersReducer,
    wsError, wsSuccess, wsClosed, wsGetOrders,
    initialOrdersWs
} from './ws-orders-old';



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
        ...initialOrdersWs,
        success: true,
        isError: false,
        orders: ["a", "b", "c"],
    };
    expect(wsOrdersReducer(previousState, wsGetOrders(payload))).toEqual(payload)
});