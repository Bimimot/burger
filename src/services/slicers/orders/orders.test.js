import {
    ordersReducer, getOrderNumber,
    orderLoading, orderError, orderSuccess, closeDetails,
    initialOrders
} from './orders';


test('Orders reducer return the initial state', () => {
    expect(ordersReducer(undefined, {})).toEqual(initialOrders)
});

test('Orders reducer loading', () => {
    const previousState = initialOrders;
    expect(ordersReducer(previousState, orderLoading())).toEqual(
        {
            ...previousState,
            openDetails: true,
            isLoading: true,
            isError: false
        })
});

test('Orders reducer close', () => {
    const previousState = { ...initialOrders, items: ["a", "b", "c"] };
    expect(ordersReducer(previousState, closeDetails())).toEqual(
        {
            ...previousState,
            openDetails: false,
            currentNumber: null
        })
});

test('Orders reducer error', () => {
    const previousState = initialOrders;
    expect(ordersReducer(previousState, orderError())).toEqual(
        {
            ...previousState,
            isLoading: false,
            isError: true
        })
});

test('Orders reducer success', () => {
    const previousState = { ...initialOrders, items: [{ number: "1" }, { number: "7j" }] };
    expect(ordersReducer(previousState, orderSuccess({ number: "2305" }))).toEqual(
        {
            ...previousState,
            items: [
                { number: "1" },
                { number: "7j" },
                { number: "2305" }
            ],
            currentNumber: "2305",
            isLoading: false,
            isError: false
        })
});



