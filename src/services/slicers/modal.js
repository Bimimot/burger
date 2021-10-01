import { createSlice } from "@reduxjs/toolkit";

const initialModal = {
    show: false,
    children: ""
};

const ingredietnSlice = createSlice({
    name: 'modal',
    initialState: initialModal,
    reducers: {
        openIngredient: (state, action) => {
            state.show = true;
            state.children = action.payload
        },
        closeIngredient: (state) => initialModal
    }
});

const { actions, reducer } = ingredietnSlice;
const { openModal, closeModal } = actions;

export { reducer as modalReducer }