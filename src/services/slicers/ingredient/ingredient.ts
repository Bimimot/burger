import { createSlice } from "@reduxjs/toolkit";
import { TIngredientState } from './ingredient-types';

const initialIngredient: TIngredientState = {
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

export {
    reducer as ingredientReducer,
    openIngredient, closeIngredient,
    initialIngredient
}