import { createSlice } from '@reduxjs/toolkit';
import { loadFoods } from '../../../utils/api';
import { translations } from '../../../utils/data';
import { TFoodsState } from './foods-types';
import { Tfood, TingredientSection } from '../../../utils/proptypes';
import { AppThunk, AppDispatch, GetState } from '../../types/store-types';

const initialFoods: TFoodsState = {
    items: [],
    sections: [],
    
    isLoading: false,
    isError: false,
    isLoaded: false
};

const foodsSlice = createSlice({
    name: 'foods',
    initialState: initialFoods,
    reducers: {
        foodsLoading: (state) => {
            state.isLoading = true;
            state.isError = false;
            state.isLoaded = false
        },
        foodsError: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isLoaded = false
        },
        foodsSuccess: (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.isLoaded = true
            state.sections = getSections(action.payload);
        },
        clearCounts: (state) => {
            state.sections.forEach(section => {
                section.foods = section.foods.map(f =>
                    ({ ...f, count: 0 }))
            });
        },
        setCounts: (state, action) => {
            state.sections.forEach(section =>
                section.foods.forEach(f =>
                    f.count = action.payload.reduce((total: number, recipeItem: Tfood) =>
                        recipeItem._id === f._id
                            ? total + (recipeItem.type !== 'bun' ? 1 : 2)
                            : total, 0))
            )
        },
        setActiveSection: (state, action) => {
            state.sections = state.sections.map(s => ({ ...s, active: s.id === action.payload }))
        }
    },
});


const { actions, reducer } = foodsSlice;
const {
    foodsLoading, foodsError, foodsSuccess,
    clearCounts, setCounts, setActiveSection
} = actions;

const getFoods: AppThunk = () => {
     return function (dispatch: AppDispatch) {
        dispatch(foodsLoading());
        return loadFoods()
            .then(result => dispatch(foodsSuccess(result.data)))
            .catch(e => {
                console.log("Error with ingredients:", e);
                return dispatch(foodsError())
            })
    }
};

const updateCounts = (dispatch: AppDispatch, getState: GetState) => {
    const curRecipe = getState().burger.recipe;
    dispatch({ type: "foods/setCounts", payload: curRecipe })
};

function getSections(items: Array<Tfood>) {
    const sections: Array<TingredientSection> = [];
    items.forEach(food => {
        const foodIndex = sections.findIndex(s => s.id === food.type);
        foodIndex > -1
            ? sections[foodIndex].foods.push({ ...food, count: 0 })
            : sections.push({
                id: food.type,
                text: translations[food.type],
                foods: [{ ...food, count: 0 }],
                active: false
            })
    });
    return sections
};

export {
    reducer as foodsReducer,
    foodsLoading, foodsError, foodsSuccess,
    clearCounts, setCounts, setActiveSection,
    initialFoods,
    getFoods, updateCounts, getSections
};
