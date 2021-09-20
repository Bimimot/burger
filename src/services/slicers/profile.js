import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { register, login } from '../../utils/api';
//test USER is:
// {
//     name: John,
//     email: a @a.ru,
//     password: 1234
// }

const initialProfile = {
    email: "",
    name: "",

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
            state.profileIsLoaded = false
        },
        profileIsError: (state) => {
            state.profileIsLoading = false;
            state.profileIsError = true;
            state.profileIsLoaded = false
        },
        profileSuccess: (state, action) => {
            state.profileIsLoading = false;
            state.profileIsError = false;
            state.profileIsLoaded = true
        },
        setProfile: (state, action) => action.payload,
        clearProfile: (state) => initialProfile,

    }
})

function registerUser( data ) {
    //const { email, password, name } = data;

    return function (dispatch) {
        dispatch(profileLoading());
        register(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
                const newTokens = {
                    accessToken: res.user.accessToken,
                    refreshToken: res.user.refreshToken
                };
                batch(() => {
                    dispatch(setProfile(newUser));
                    dispatch(profileSuccess());
                })
                localStorage.setItem('user', newTokens);
            })
            .catch(err => {
                console.log("Error with register", err);
                dispatch(profileIsError())
            })
    }
}

function loginUser( data ) {
    //const { email, name } = data;

    return function (dispatch) {
        dispatch(profileLoading());
        login(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
                const newTokens = {
                    accessToken: res.user.accessToken,
                    refreshToken: res.user.refreshToken
                };
                batch(() => {
                    dispatch(setProfile(newUser));
                    dispatch(profileSuccess());
                })
                localStorage.setItem('user', newTokens);
            })
            .catch(err => {
                console.log("Error with login", err);
                dispatch(profileIsError())
            })
    }
}

const { reducer, actions } = profileSlice;
const { setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError } = actions;

export {
    reducer as profileReducer,
    registerUser, loginUser
}

