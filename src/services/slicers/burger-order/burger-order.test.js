import {
    burgerOrderReducer,
    openOrder, closeOrder,
    initialBurgerOrder
} from './burger-order';


test('Burger Order reducer return the initial state', () => {
    expect(burgerOrderReducer(undefined, {})).toEqual(initialBurgerOrder)
});

test('Burger Order reducer open', () => {
    const previousState = initialBurgerOrder;
    expect(burgerOrderReducer(previousState, openOrder("a"))).toEqual(
        {
            show: true,
            item: "a"
        })
});

test('Burger Order reducer close', () => {
    const previousState = {show: true, item: "a"};
    expect(burgerOrderReducer(previousState, closeOrder())).toEqual(initialBurgerOrder)
});

