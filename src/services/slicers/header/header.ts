import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { THeaderState } from './header-types';
import { TheaderLink } from '../../../utils/proptypes';

const initialHeader: THeaderState = {
    burger: { type: "secondary", icon: "burger", text: "Конструктор", link: "/" },
    orders: { type: "secondary", icon: "list", text: "Лента заказов", link: "/feed" },
    profile: { type: "secondary", icon: "profile", text: "Личный кабинет", link: "/profile" }
}

export const headerSlice = createSlice({
    name: 'header',
    initialState: initialHeader,
    reducers: {
        onChangeLink: (state, action: PayloadAction<TheaderLink>) => {
            for (const key in state) {
                state[key as keyof THeaderState] = key === action.payload
                    ? { ...state[key as keyof THeaderState], type: "primary" }
                    : { ...state[key as keyof THeaderState], type: "secondary" }
            };
        }
    },
});


const { actions, reducer } = headerSlice;
const { onChangeLink } = actions;

export { reducer as headerReducer, onChangeLink, initialHeader };
