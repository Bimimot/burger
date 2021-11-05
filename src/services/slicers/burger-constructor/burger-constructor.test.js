
import {
    burgerReducer,
    clear, del, add,
    initialBurger
} from './burger-constructor';


test('Burger reducer return the initial state', () => {
    expect(burgerReducer(undefined, {})).toEqual(initialBurger)
});

test('Burger reducer clear the state', () => {
    const previousState = {
        recipe: [{ _id: "1" }, { _id: "2" }],
        totalPrice: 200,
        bun: null,
        filling: [{ _id: "1" }, { _id: "2" }]
    };
    expect(burgerReducer(previousState, clear())).toEqual(initialBurger)
});

test('Burger reducer add ingred', () => {
    const previousState = {
        recipe: [
            { _id: "1a", price: 1, unicId: "01a" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "2b", price: 10, unicId: "22b" },
        ],
        totalPrice: 21,
        bun: null,
        filling: [
            { _id: "1a", price: 1, unicId: "01a" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "2b", price: 10, unicId: "22b" },
        ]
    };

    const ingred = { _id: "4c", type: "bun", price: 100 };
    expect(burgerReducer(previousState, add(ingred))).toEqual({
        recipe: [
            { _id: "1a", price: 1, unicId: "01a" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "2b", price: 10, unicId: "22b" },
            { _id: "4c", type: "bun", price: 100 }
        ],
        totalPrice: 221,
        bun: { _id: "4c", type: "bun", price: 100 },
        filling: previousState.filling
    })
});

test('Burger reducer del ingred', () => {
    const previousState = {
        recipe: [
            { _id: "1a", price: 1, unicId: "01a" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "2b", price: 10, unicId: "22b" },
            { _id: "4c", type: "bun", price: 100 }
        ],
        totalPrice: 221,
        bun: { _id: "4c", type: "bun", price: 100 },
        filling: [
            { _id: "1a", price: 1, unicId: "01a" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "2b", price: 10, unicId: "22b" },
        ]
    };

    const ingred = previousState.recipe[0];
    expect(burgerReducer(previousState, del(ingred.unicId))).toEqual({
        recipe: [
            { _id: "2b", price: 10, unicId: "02b" },
            { _id: "2b", price: 10, unicId: "12b" },
            { _id: "4c", type: "bun", price: 100 }
        ],
        totalPrice: 220,
        bun: { _id: "4c", type: "bun", price: 100 },
        filling: [
            { _id: "2b", price: 10, unicId: "02b" },
            { _id: "2b", price: 10, unicId: "12b" },
        ]
    })
});

