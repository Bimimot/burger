import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock';

import {
    foodsReducer,
    foodsLoading, foodsError, foodsSuccess,
    clearCounts, setCounts, setActiveSection,
    initialFoods,
    getFoods, updateCounts, getSections
} from './foods';

import { baseUrl } from '../../../utils/api';

test('Foods reducer should return the initial state', () => {
    expect(foodsReducer(undefined, {})).toEqual(initialFoods)
});

test('Foods reducer handle a foodsLoading', () => {
    const previousState = {}
    expect(foodsReducer(previousState, foodsLoading())).toEqual(
        {
            isLoading: true,
            isError: false,
            isLoaded: false
        })
});

test('Foods reducer handle an foodsError', () => {
    const previousState = {}
    expect(foodsReducer(previousState, foodsError())).toEqual(
        {
            isLoading: false,
            isError: true,
            isLoaded: false
        })
});

test('Foods reducer handle a foodsSuccess', () => {
    const previousState = {}
    expect(foodsReducer(previousState,
        foodsSuccess([
            { _id: 1, type: "main" },
            { _id: 2, type: "bun" }
        ])
    )).toEqual(
        {
            isLoading: false,
            isError: false,
            isLoaded: true,
            items: [{ _id: 1, type: "main" }, { _id: 2, type: "bun" }],
            sections: [
                { active: false, id: "main", text: "Начинка", foods: [{ _id: 1, type: "main", count: 0 }] },
                { active: false, id: "bun", text: "Булки", foods: [{ _id: 2, type: "bun", count: 0 }] }
            ]
        })
});

test('Foods reducer handle a clearCounts', () => {
    const previousState = {
        ...initialFoods,
        sections: [
            { active: false, id: "main", text: "Начинка", foods: [{ _id: 1, type: "main", count: 1 }] },
            { active: false, id: "bun", text: "Булки", foods: [{ _id: 2, type: "bun", count: 2 }] }
        ]
    };
    expect(foodsReducer(previousState, clearCounts()
    )).toEqual({
        ...initialFoods,
        sections: [
            { active: false, id: "main", text: "Начинка", foods: [{ _id: 1, type: "main", count: 0 }] },
            { active: false, id: "bun", text: "Булки", foods: [{ _id: 2, type: "bun", count: 0 }] }
        ]
    })
});

test('Foods reducer handle a setCounts', () => {
    const previousState = {
        ...initialFoods,
        sections: [
            { active: false, id: "main", text: "Начинка", foods: [{ _id: 1, type: "main", count: 0 }] },
            { active: false, id: "bun", text: "Булки", foods: [{ _id: 2, type: "bun", count: 0 }] }
        ]
    };
    expect(foodsReducer(previousState, setCounts([
        { _id: 1, type: "main", count: 0 },
        { _id: 2, type: "bun", count: 0 }
    ])
    )).toEqual({
        ...initialFoods,
        sections: [
            { active: false, id: "main", text: "Начинка", foods: [{ _id: 1, type: "main", count: 1 }] },
            { active: false, id: "bun", text: "Булки", foods: [{ _id: 2, type: "bun", count: 2 }] }
        ]
    })
});


test('Foods reducer handle an setActiveSection', () => {
    const previousState = {
        sections: [
            { active: false, id: "main", text: "Начинка" },
            { active: false, id: "bun", text: "Булки" }
        ]
    };
    expect(foodsReducer(previousState, setActiveSection("main"))).toEqual(
        {
            sections: [
                { active: true, id: "main", text: "Начинка" },
                { active: false, id: "bun", text: "Булки" }
            ]
        })
});

//----async actions----
// const middlewares = [thunk];
// const mockStore = configureMockStore(middlewares);

// describe('async actions', () => {
//     //clean results of tests
//     afterEach(() => {
//         fetchMock.reset()
//         fetchMock.restore()
//     });

//     it('expected actions should be dispatched on successful request', () => {
//         const expectedActions = [
//             { type: 'foods/foodsLoading' },
//             { type: 'foods/foodsSuccess', payload: [{ _id: 1, type: "main" }, { _id: 2, type: "bun" }] }
//         ];

//         const store = mockStore({});
//         fetchMock.getOnce(`${baseUrl}/ingredients`, { response: 200 });

//         return store.dispatch(getFoods())
//             .then(() => {
//                 expect(store.getActions()).toEqual(expectedActions)
//             })        
//     })
//     // it('expected actions should be dispatched on failed request', () => {
//     //     const expectedActions = [
//     //         { type: 'foods/foodsLoading' },
//     //         { type: 'foods/foodsError' },
//     //     ];
//     //     const store = mockStore({})

//     //     fetchMock.get('*', { response: 404 });
//     //     return store.dispatch(getFoods())
//     //         .then(() => {
//     //             expect(store.getActions()).toEqual(expectedActions)
//     //         })
//     // })
// })