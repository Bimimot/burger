
import { TingredientSection, Tfood } from "../../../utils/proptypes";

export type TFoodsState = {
    items: Array<Tfood>,
    sections: Array<TingredientSection>,

    isLoading: boolean,
    isError: boolean,
    isLoaded: boolean
}
