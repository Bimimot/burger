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
        ...initialFeedWs,
        success: true,
        isError: false,
        orders: ["a", "b", "c"],
        total: 10,
        totalToday: 2
    };
    expect(wsFeedReducer(previousState, wsGetFeed(payload))).toEqual(payload)
});