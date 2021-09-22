import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { getUser, updateUser, login, register, logout } from '../../utils/api';
import { setCookie } from "../../utils/helpers";
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
            state.form.inputs = { ...state.form.inputs, [key]: value }
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

const loginUser = () => {
    return (dispatch, getState) => {
        const data = getState().authForm.data;

        dispatch({ type: "profile/profileLoading" });
        login(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("token", res.accessToken.split('Bearer ')[1]);
                batch(() => {
                    dispatch({ type: "profile/setProfile", payload: newUser });
                    dispatch({ type: "profile/profileSuccess" });
                    dispatch({ type: "auth/clearForm" });
                })

                return
            })
            .catch(err => {
                console.log("Error with login", err);
                dispatch({ type: "profile/profileIsError" });
            })
    }
};

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
    updateUserProfile,
    loginUser
}

