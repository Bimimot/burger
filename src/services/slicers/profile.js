import { createSlice } from '@reduxjs/toolkit';
import { getUser, updateUser, login, register, logout } from '../../utils/api';
import { updateToken } from '../../utils/api';
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
        inputs: {
            name: "",
            email: "",
            password: ""
        },
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
            state.user = { ...action.payload, isAuth: true };

            state.form.inputs.email = action.payload.email;
            state.form.inputs.name = action.payload.name;
        },
        clearProfile: (state) => initialProfile,
        onChangeInput: (state, action) => {
            const { key, value } = action.payload;
            state.form.inputs = {...state.form.inputs, [key]: value}
        }

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
                dispatch(clearProfile());
                return
            })
            .catch((err) => {
                console.log("Err with logout User", err);
            })
    }
}

const updateUserProfile = (data) => {
    return (dispatch) => {
        updateToken()
            .then(() => updateUser(data))
            .then(res => dispatch(setProfile(res.user)))
            .catch((err) => {
                console.log("Err with update User", err);
                dispatch(profileIsError())
            })
    }
}


const { reducer, actions } = profileSlice;
const { setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError, onChangeInput } = actions;

export {
    reducer as profileReducer,
    getUserProfile,
    logoutUser,
    onChangeInput,
    updateUserProfile
}
