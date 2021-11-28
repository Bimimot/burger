import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateCounts } from '../foods/foods';
import { createRandomRecipe, getBurgerByRecipe } from '../../../utils/helpers';
import { TBurgerConstructorState } from './burger-constructor-types';
import { Tfood } from '../../../utils/proptypes';
import { AppThunk, AppDispatch, GetState } from '../../types/store-types';

const initialBurger: TBurgerConstructorState = {
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
            const foods = action.payload;
            return getBurgerByRecipe(createRandomRecipe(foods));
        },
        del: (state, action) => {
            const recipeAfterDel = state.filling.filter(f => f.unicId !== action.payload);
            if (!!state.bun) {
                recipeAfterDel.push(state.bun)
            };
            return getBurgerByRecipe(recipeAfterDel);
        },
        add: (state, action: PayloadAction<Tfood>) => {
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
            const filling = action.payload;
            state.filling = filling
        }
    },
});

const addInRecipe: (food: Tfood) => (dispatch: AppDispatch, getState: GetState) => Promise<void>
    = (food: Tfood) => {
    return async function (dispatch, getState) {
        await dispatch({ type: 'burger/add', payload: food });
        updateCounts(dispatch, getState);
    }
}

const delFromRecipe: (food: Tfood) => (dispatch: AppDispatch, getState: GetState) => void
    = (food: Tfood) => {
    return function (dispatch, getState) {
        dispatch({ type: 'burger/del', payload: food.unicId });
        updateCounts(dispatch, getState);
    }
}

const clearRecipe: AppThunk = () => {
    return function (dispatch: AppDispatch) {
        dispatch({ type: 'burger/clear' });
        dispatch({ type: 'foods/clearCounts' })
    }
}

const randomRecipe: () => (dispatch: AppDispatch, getState: GetState) => Promise<void>
    = () => {
    return async function (dispatch: AppDispatch, getState: GetState) {
        const foods = getState().foods.items;
        await dispatch({ type: 'burger/random', payload: foods });
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
