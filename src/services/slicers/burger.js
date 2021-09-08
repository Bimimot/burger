import { createSlice } from '@reduxjs/toolkit';
import { randomInteger } from "../../utils/helpers";

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
            return getBurgerByRecipe(randomRecipe(action.items))
        },
        del: (state, action) => {
            let delFilling = [...state.filling];
            if (!!state.filling[action.fillingIndex]) {
                delFilling.splice(action.fillingIndex, 1);
            }
            return getBurgerByRecipe(delFilling.concat(state.bun));
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
        }
    },
});

const randomRecipe = (foodsArr) => {
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
    const filling = recipe.filter(food => food.type !== "bun");
    const totalPrice = filling.reduce((total, current) => total + current.price, 0)
        + (!!bun ? bun.price * 2 : 0);
    recipe = filling.concat(!!bun ? bun : []);
    return { recipe, bun, filling, totalPrice }
}

const { actions, reducer } = burgerSlice;
//const { clear, random, del, add } = actions;



export { reducer as burgerReducer, actions };