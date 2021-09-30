import { createSlice } from '@reduxjs/toolkit';

const initialHeader = {
    burger: { type: "secondary", icon: "burger", text: "Конструктор", link: "/" },
    orders: { type: "secondary", icon: "list", text: "Лента заказов", link: "/feed" },
    profile: { type: "secondary", icon: "profile", text: "Личный кабинет", link: "/profile" }
}

const headerSlice = createSlice({
    name: 'header',
    initialState: initialHeader,
    reducers: {
        onChangeLink: (state, action) => {
            for (const key in state) {
                state[key] = key === action.payload
                    ? { ...state[key], type: "primary" }
                    : { ...state[key], type: "secondary" }
            };
        }
    },
});


const { actions, reducer } = headerSlice;
const { onChangeLink } = actions;

export { reducer as headerReducer, onChangeLink };