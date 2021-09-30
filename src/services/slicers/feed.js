import { createSlice } from '@reduxjs/toolkit';

const initialFeed =
{
    "success": true,
    "orders": [
        {
            "ingredients": [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733cf",
                "60d3b41abdacab0026a733d0",
                "60d3b41abdacab0026a733ca",
                "60d3b41abdacab0026a733ca",
                "60d3b41abdacab0026a733d2"

            ],
            "_id": "896571299",
            "status": "done",
            "number": 89657299,
            "createdAt": "2021-06-23T20:11:01.403Z",
            "updatedAt": "2021-06-23T20:11:01.406Z",
            "name": "Минеральный альфа-сахаридный био-марсианский краторный space антарианский бургер",
            "total": 500
        },
        {
            "ingredients": [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733d2",
                "60d3b41abdacab0026a733c9",
                "60d3b41abdacab0026a733cf",
                "60d3b41abdacab0026a733d0",
                "60d3b41abdacab0026a733cf",
                "60d3b41abdacab0026a733d0",
                "60d3b41abdacab0026a733ca",
                "60d3b41abdacab0026a733ca"

            ],
            "_id": "1048247299",
            "status": "done",
            "number": 104847299,
            "createdAt": "2021-06-23T20:13:23.654Z",
            "updatedAt": "2021-06-23T20:13:23.657Z",
            "name": "Минеральный метеоритный краторный spicy бессмертный астероидный антарианский бургер",
            "total": 900
        },
        {
            "ingredients": [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733d2",
                "60d3b41abdacab0026a733c9"

            ],
            "_id": "1048347299",
            "status": "done",
            "number": 104847299,
            "createdAt": "2021-06-23T20:13:23.654Z",
            "updatedAt": "2021-06-23T20:13:23.657Z",
            "name": "Минеральный метеоритный краторный spicy бессмертный астероидный антарианский бургер",
            "total": 900
        },
        {
            "ingredients": [
                "60d3b41abdacab0026a733c6",
                "60d3b41abdacab0026a733d2",
                "60d3b41abdacab0026a733c9"

            ],
            "_id": "1048447299",
            "status": "done",
            "number": 104847299,
            "createdAt": "2021-06-23T20:13:23.654Z",
            "updatedAt": "2021-06-23T20:13:23.657Z",
            "name": "Минеральный метеоритный краторный spicy бессмертный астероидный антарианский бургер",
            "total": 900
        },
        {
            "ingredients": [
                "60d3b41abdacab0026a733c7",
                "60d3b41abdacab0026a733d2",
                "60d3b41abdacab0026a733c9"

            ],
            "_id": "1048547299",
            "status": "done",
            "number": 104847299,
            "createdAt": "2021-06-23T20:13:23.654Z",
            "updatedAt": "2021-06-23T20:13:23.657Z",
            "name": "Минеральный метеоритный краторный spicy бессмертный астероидный антарианский бургер",
            "total": 900
        },
    ],
    "total": 195739,
    "totalToday": 201
};



const feedSlice = createSlice({
    name: "feed",
    initialState: initialFeed,
    reducers: {
        updateFeed: (state, action) => action.payload
    }
});

const { actions, reducer } = feedSlice;

export { reducer as feedReducer };

