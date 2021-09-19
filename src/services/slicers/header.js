import { createSlice } from '@reduxjs/toolkit';

const initialHeader = {
    burger: { type: "primary", icon: "burger", text: "Конструктор", link: "/" },
    orders: { type: "secondary", icon: "list", text: "Лента заказов", link: "/profile/orders" },
    profile: { type: "secondary", icon: "profile", text: "Личный кабинет", link: "/profile" }
}

const headerSlice = createSlice({
    name: 'header',
    initialState: initialHeader,
    reducers: {
        onChangeLink: (state, action) => {
            const newState = {};
            for (const key in Object.keys(state)) {
                newState[key] = action.payload === newState[key]
                    ? { ...state[key], type: "primary" }
                    : { ...state[key], type: "secondary" }
            }
        }
    },
});


const { actions, reducer } = headerSlice;
const { onChangeLink } = actions;

export { reducer as headerReducer, onChangeLink };