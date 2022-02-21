import {
    wsFeedReducer,
    wsError, wsSuccess, wsClosed, wsGetFeed,
    initialFeedWs
} from './ws-feed';


test('WsFeed reducer return the initial state', () => {
    expect(wsFeedReducer(undefined, {})).toEqual(initialFeedWs)
});

test('WsFeed reducer error', () => {
    const previousState = initialFeedWs;
    expect(wsFeedReducer(previousState, wsError())).toEqual(
        {
            ...previousState,
            success: false,
            isError: true
        })
});

test('WsFeed reducer success', () => {
    const previousState = initialFeedWs;
    expect(wsFeedReducer(previousState, wsSuccess())).toEqual(
        {
            ...previousState,
            success: true
        })
});

test('WsFeed reducer close', () => {
    const previousState = { ...initialFeedWs, success: true };
    expect(wsFeedReducer(previousState, wsClosed())).toEqual(
        {
            ...previousState,
            success: false
        })
});

test('WsFeed reducer getFeed', () => {
    const previousState = { ...initialFeedWs, success: true };
    const payload = {
        parsedData: {
            success: true,
            orders: [
                { id: "a", ingredients: ["01", "02"] },
            ],
            total: 10,
            totalToday: 2
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
    expect(wsFeedReducer(previousState, wsGetFeed(payload)))
        .toEqual({
            ...previousState,
            success: true,
            orders: readyOrders,
            total: payload.parsedData.total,
            totalToday: payload.parsedData.totalToday
        })
});