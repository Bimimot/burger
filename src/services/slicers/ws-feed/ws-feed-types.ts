import { Tfoods } from "../../../utils/proptypes";

export type TFeedWsState = {
    success: boolean,
    isError: boolean,
    orders: Array<any> | null,
    total: number,
    totalToday: number
};

export type TFeedWsPayload = {
    foods: Tfoods,
    parsedData: TFeedWsState
}