
import { Tfood } from "../../../utils/proptypes";

export type TBurgerConstructorState = {
    recipe: Array<Tfood>,
    totalPrice: number | null,
    bun: Tfood | null | undefined,
    filling: Array<Tfood>
}
