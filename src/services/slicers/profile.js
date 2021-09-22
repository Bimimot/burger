import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUser, login, register, logout } from '../../utils/api';

//test USER is:
// {
//     name: John,
//     email: aa@aa.ru, либо dd@dd.ru
//     password: 1234
// }

const initialProfile = {
    user: {
        email: "",
        name: "",
        isAuth: false
    },
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
            state.user = {...action.payload, isAuth: true};

            state.form.email = action.payload.email;
            state.form.name = action.payload.name;
        },
        clearProfile: (state) => initialProfile,

    }
})

const getUserProfile = () => {
    return (dispatch) => {
        getUser()
            .then(res => dispatch(setProfile(res.user)))
            .catch((err) => {
                console.log("Err with get User", err);
                dispatch(profileIsError())
            })
    }
}

const logoutUser = () => {
    return (dispatch) => {
        logout()
            .then(() => {
                localStorage.removeItem('refreshToken');
                dispatch(clearProfile());
                return
            })
            .catch((err) => {
                console.log("Err with logout User", err);                
            })
    }
}


const { reducer, actions } = profileSlice;
const { setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError } = actions;

export {
    reducer as profileReducer,
    getUserProfile,
    logoutUser
}

