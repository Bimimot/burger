import { FOODS_LOADING, FOODS_SUCCESS, FOODS_ERROR, getFoods } from '../actions/foods';

const initialFoods = {
    items: [],
    isLoading: false,
    isError: false
};


export const foodsReducer = (foods = initialFoods, action) => {
    switch (action.type) {
        case FOODS_LOADING: {
            return {
                ...foods,
                isLoading: true,
                isError: false
            };
        }

        case FOODS_SUCCESS: {
            return {
                items: action.items,
                isLoading: false,
                isError: false
            };
        }

        case FOODS_ERROR: {
            return {
                ...foods,
                isLoading: false,
                isError: true

            };
        }

        default: {
            return foods;
        }
    }
}