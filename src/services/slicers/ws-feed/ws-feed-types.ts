export type TFeedWsState = {
    success: boolean,
    isError: boolean,
    orders: Array<any> | null,
    total: number,
    totalToday: number
};