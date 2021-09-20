import { createSlice } from '@reduxjs/toolkit';
//test USER is:
// {
//     name: John,
//     email: aa@aa.ru, либо dd@dd.ru
//     password: 1234
// }

const initialProfile = {
    email: "",
    name: "",
    form: {
        name: "",
        email: "",
        password: ""
    },

    profileIsLoading: false,
    porfileIsLoaded: false,
    profileisError: false
};

const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfile,
    reducers: {
        profileLoading: (state) => {
            state.profileIsLoading = true;
            state.profileIsError = false;
            state.profileIsLoaded = false;
        },
        profileIsError: (state) => {
            state.profileIsLoading = false;
            state.profileIsError = true;
            state.profileIsLoaded = false;
        },
        profileSuccess: (state, action) => {
            state.profileIsLoading = false;
            state.profileIsError = false;
            state.profileIsLoaded = true;
        },
        setProfile: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;

            state.form.email = action.payload.email;
            state.form.name = action.payload.name;
        },
        clearProfile: (state) => initialProfile,

    }
})



const { reducer, actions } = profileSlice;
const { setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError } = actions;

export {
    reducer as profileReducer
}

