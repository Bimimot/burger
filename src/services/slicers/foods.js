import { createSlice } from '@reduxjs/toolkit';
import { loadFoods } from '../../utils/api';
import { translations } from '../../utils/data';

const initialFoods = {
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
            state.items = action.payload.items;
            state.isLoading = false;
            state.isError = false;
            state.isLoaded = true
            state.sections = getSections(action.payload.items);
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
                    f.count = action.payload.reduce((total, recipeItem) =>
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
const { foodsLoading, foodsError, foodsSuccess, setActiveSection } = actions;

 function getFoods() {
    return function (dispatch) {
        dispatch(foodsLoading());
        loadFoods()
            .then(result => dispatch(foodsSuccess({ items: result.data })))
            .catch(e => {
                console.log("Error with ingredients:", e);
                dispatch(foodsError())
            })
    }
};

const updateCounts = (dispatch, getState) => {
    const curRecipe = getState().burger.recipe;
    dispatch({ type: "foods/setCounts", payload: curRecipe })
};

function getSections(items) {
    const sections = [];
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

export { reducer as foodsReducer, getFoods, setActiveSection, updateCounts };