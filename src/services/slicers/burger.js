import { createSlice } from '@reduxjs/toolkit';
import { updateCounts } from './foods';
import { createRandomRecipe, getBurgerByRecipe } from '../../utils/helpers';

const initialBurger = {
    recipe: [],
    totalPrice: null,
    bun: null,
    filling: []
};

const burgerSlice = createSlice({
    name: 'burger',
    initialState: initialBurger,
    reducers: {
        clear: (state) => initialBurger,
        random: (state, action) => {
            return getBurgerByRecipe(createRandomRecipe(action.items))
        },
        del: (state, action) => {
            return getBurgerByRecipe(state.filling.filter(f => f.unicId !== action.payload).concat(state.bun));
        },
        add: (state, action) => {
            let addRecipe = [...state.recipe];
            if (action.food.type === "bun" && !!state.bun) {
                addRecipe.splice(
                    addRecipe.findIndex(f => f.type === "bun"), 1, action.food)
            } else {
                addRecipe.push(action.food)
            }
            return getBurgerByRecipe(addRecipe)
        },
        sort: (state, action) => {
            state.filling = action.filling
        }
    },
});

const addInRecipe = (food) => {
    return async function (dispatch, getState) {
        await dispatch({ type: 'burger/add', food });
        updateCounts(dispatch, getState);
    }
}

const delFromRecipe = (food) => {
    return function (dispatch, getState) {
        dispatch({ type: 'burger/del', payload: food.unicId });
        updateCounts(dispatch, getState);
    }
}

const clearRecipe = () => {
    return function (dispatch) {
        dispatch({ type: 'burger/clear' });
        dispatch({ type: 'foods/clearCounts' })
    }
}

const randomRecipe = () => {
    return async function (dispatch, getState) {
        const foods = getState().foods.items;
        await dispatch({ type: 'burger/random', items: foods });
        updateCounts(dispatch, getState);
    }
}

const { actions, reducer } = burgerSlice;
const { clear, random, del, add } = actions;

export {
    reducer as burgerReducer, actions,
    addInRecipe, delFromRecipe, clearRecipe, randomRecipe
};