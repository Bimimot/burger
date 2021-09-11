import { createSlice } from "@reduxjs/toolkit";

const initialIngredient = {
    show: false,
    item: null
};

const ingredietnSlice = createSlice({
    name: 'ingredient',
    initialState: initialIngredient,
    reducers: {
        openIngredient: (state, action) => {
            state.show = true;
            state.item = action.payload    
        },
        closeIngredient: (state) => {
            state.show = false;
            state.item= null
        }
    }
});

const { actions, reducer } = ingredietnSlice;
const { openIngredient, closeIngredient } = actions;

export {reducer as ingredientReducer }