
import { Tuser, TprofileForm } from "../../../utils/proptypes"

export type TprofileState = {
    user: Tuser,
    form: TprofileForm,

    profileIsLoading: boolean,
    porfileIsLoaded: boolean,
    profileIsError: boolean
}