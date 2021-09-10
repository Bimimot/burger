import { createSlice } from '@reduxjs/toolkit';
import { randomInteger } from "../../utils/helpers";
import { updateCounts } from './foods';

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

const createRandomRecipe = (foodsArr) => {
    const recipe = [];
    const count = randomInteger(6, 10);

    for (let i = 0; i < count; i++) {
        recipe[i] = foodsArr[randomInteger(0, foodsArr.length - 1)];
    }
    if (!!!recipe.find(f => f.type === "bun")) {
        recipe.push(foodsArr.find(f => f.type === "bun"))
    }
    return recipe
}

function getBurgerByRecipe(recipe) {
    const bun = recipe.find(food => food.type === "bun");
    const filling = recipe.filter(food => food.type !== "bun").map((f, i) => ({ ...f, unicId: i + f._id }));
    const totalPrice = filling.reduce((total, current) => total + current.price, 0)
        + (!!bun ? bun.price * 2 : 0);
    recipe = filling.concat(!!bun ? bun : []);
    return { recipe, bun, filling, totalPrice }
}

const { actions, reducer } = burgerSlice;
const { clear, random, del, add } = actions;

export {
    reducer as burgerReducer, actions,
    addInRecipe, delFromRecipe, clearRecipe, randomRecipe
};