import {
    ingredientReducer,
    openIngredient, closeIngredient,
    initialIngredient
} from './ingredient';


test('Burger Order reducer return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialIngredient)
});

test('Burger Order reducer open', () => {
    const previousState = initialIngredient;
    expect(ingredientReducer(previousState, openIngredient("a"))).toEqual(
        {
            show: true,
            item: "a"
        })
});

test('Burger Order reducer close', () => {
    const previousState = { show: true, item: "a" };
    expect(ingredientReducer(previousState, closeIngredient())).toEqual(initialIngredient)
});

