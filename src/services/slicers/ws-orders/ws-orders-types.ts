import { Tfoods } from "../../../utils/proptypes";

export type TOrdersWsState = {
    success: boolean,
    isError: boolean,
    orders: Array<any> | null
};

export type TOrdersWsPayload = {
    foods: Tfoods,
    parsedData: TOrdersWsState
}