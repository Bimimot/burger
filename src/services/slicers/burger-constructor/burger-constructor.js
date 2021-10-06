import { createSlice } from '@reduxjs/toolkit';
import { updateCounts } from '../foods/foods';
import { createRandomRecipe, getBurgerByRecipe } from '../../../utils/helpers';

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
            const recipeAfterDel = state.filling.filter(f => f.unicId !== action.payload);
            if (!!state.bun) {
                recipeAfterDel.push(state.bun)
            };
            return getBurgerByRecipe(recipeAfterDel);
        },
        add: (state, action) => {
            const newFood = { ...action.payload };
            let addRecipe = [...state.recipe];
            if (newFood.type === "bun" && !!state.bun) {
                addRecipe.splice(
                    addRecipe.findIndex(f => f.type === "bun"), 1, newFood)
            } else {
                addRecipe.push(newFood)
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
        await dispatch({ type: 'burger/add', payload: food });
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
    reducer as burgerReducer,
    clear, random, del, add,
    addInRecipe, delFromRecipe, clearRecipe, randomRecipe,
    initialBurger
};