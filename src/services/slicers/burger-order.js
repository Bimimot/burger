import { createSlice } from "@reduxjs/toolkit";

const initialBurgerOrder = {
    show: false,
    item: null
};

const burgerOrderSlice = createSlice({
    name: 'burgerOrder',
    initialState: initialBurgerOrder,
    reducers: {
        openOrder: (state, action) => {
            state.show = true;
            state.item = action.payload
        },
        closeOrder: (state) => {
            state.show = false;
            state.item = null
        }
    }
});

const { actions, reducer } = burgerOrderSlice;
const { openOrder, closeOrder } = actions;

export { reducer as burgerOrderReducer }