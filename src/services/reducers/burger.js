import { CLEAR, RANDOM, ADD, DELETE } from '../actions/burger';

const initialBurger = {
    recipe: [],
    totalPrice: null,
    bun: null,
    filling: []
};


export const burgerReducer = (state = initialBurger, action) => {
    switch (action.type) {
        case CLEAR: {
            return { ...state };
        }
        case RANDOM: {
            return { ...state };
        }
        case ADD: {
            return { ...state };
        }
        case DELETE: {
            return { ...state};
        }

        default: {
            return state;
        }
    }
}