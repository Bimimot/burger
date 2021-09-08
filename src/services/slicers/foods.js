import { createSlice } from '@reduxjs/toolkit';
import { loadFoods } from '../../utils/api';
import { translations } from '../../utils/data';

const initialFoods = {
    items: [],
    isLoading: false,
    isError: false,
    sections: []
};

const foodsSlice = createSlice({
    name: 'foods',
    initialState: initialFoods,
    reducers: {
        foodsLoading: (state) => {
            state.isLoading = true;
            state.isError = false
        },
        foodsError: (state) => {
            state.isLoading = false;
            state.isError = true
        },
        foodsSuccess: (state, action) => {
            state.items = action.payload.items;
            state.isLoading = false;
            state.isError = false;
            state.sections = getSections(action.payload.items);
        },
        setActiveSection: (state, action) => {
            state.sections = state.sections.map(s => ({...s, active: s.id===action.payload}))
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

function getSections(items) {
    const sections = [];
    items.forEach(food => {
        const foodIndex = sections.findIndex(s => s.id === food.type);
        foodIndex > -1
            ? sections[foodIndex].foods.push(food)
            : sections.push({
                id: food.type,
                text: translations[food.type],
                foods: [food],
                active: false})
    });
    return sections
} 

export {reducer as foodsReducer, getFoods, setActiveSection};