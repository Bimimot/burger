import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TprofileState } from './profile-types';
import { AppThunk, AppDispatch, GetState } from '../../types/store-types';
import { TinputsForm } from '../../../utils/proptypes';
import { batch } from 'react-redux';
import { getUser, updateUser, login, register, logout, checkEmail, setNewPass } from '../../../utils/api';
import { setCookie } from "../../../utils/helpers";
import { updateToken } from '../../../utils/api';

//test USER is:
// {
//     name: John,
//     email: aa@aa.ru, либо dd@dd.ru
//     password: 1234
// }

const initialProfile: TprofileState = {
    user: {
        email: "",
        name: "",
        isAuth: false,
        canRestorePass: false,
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
    profileIsError: false
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState: initialProfile,
    reducers: {
        profileLoading: (state) => {
            state.profileIsLoading = true;
            state.profileIsError = false;
            state.porfileIsLoaded = false;
        },
        profileIsError: (state) => {
            state.profileIsLoading = false;
            state.profileIsError = true;
            state.porfileIsLoaded = false;
        },
        profileSuccess: (state, action) => {
            state.profileIsLoading = false;
            state.profileIsError = false;
            state.porfileIsLoaded = true;
        },
        setProfile: (state, action: PayloadAction<any>) => {
            state.user = { ...action.payload, isAuth: true };

            state.form.inputs.email = action.payload.email;
            state.form.inputs.name = action.payload.name;
        },
        clearProfile: (state) => initialProfile,
        onChangeInput: (state, action) => {
            const { key, value } = action.payload;
            state.form.inputs = { ...state.form.inputs, [key]: value }
        },
        toggleRestorePass: (state) => {
            state.user = { ...state.user, canRestorePass: !state.user.canRestorePass }
        }
    }
})


const getUserProfile: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        updateToken()
            .then(() => getUser())
            .then(res => dispatch(setProfile(res.user)))
            .then(() => dispatch({ type: "wsOrders/wsInit" }))
            .catch((err) => {
                console.log("Err with get User", err);
                dispatch(profileIsError())
            })
    }
}

const loginUser = () => {
    return (dispatch: AppDispatch, getState: GetState ) => {
        const data = getState().authForm.data;

        dispatch({ type: "profile/profileLoading" });
        login(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("accessToken", res.accessToken.split('Bearer ')[1]);

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

const registerUser = () => {
    return (dispatch: AppDispatch, getState: GetState) => {
        const data = getState().authForm.data;

        dispatch({ type: "profile/profileLoading" });
        register(data)
            .then(res => {
                const newUser = {
                    name: res.user.name,
                    email: res.user.email
                };
                batch(() => {
                    dispatch({ type: "profile/setProfile", payload: newUser });
                    dispatch({ type: "profile/profileSuccess" });
                    dispatch({ type: "auth/clearForm" });
                })
                localStorage.setItem('refreshToken', res.refreshToken);
                setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
                return
            })
            .catch(err => {
                console.log("Error with register", err);
                dispatch({ type: "profile/profileIsError" });
            })
    }
};

const logoutUser: AppThunk = () => {
    return (dispatch: AppDispatch) => {
        logout()
            .then(() => {
                dispatch(clearProfile());
                localStorage.removeItem('refreshToken');
                setCookie("accessToken", null);
                return
            })
            .catch((err) => {
                console.log("Err with logout User", err);
            })
    }
}

const updateUserProfile = (data: TinputsForm) => {
    return (dispatch: AppDispatch) => {
        updateToken()
            .then(() => updateUser(data))
            .then((res:any) => dispatch(setProfile(res.user)))
            .catch((err) => {
                console.log("Err with update User", err);
                dispatch(profileIsError())
            })
    }
}

const resetPass = () => {
    return (dispatch: AppDispatch, getState: GetState) => {
        const data = getState().authForm.data;
        checkEmail(data)
            .then(() => dispatch(toggleRestorePass))
            .catch(err => console.log("Error with reset pass", err))
    }
};


const restorePass = () => {
    return (dispatch: AppDispatch, getState: GetState) => {
        const data = getState().authForm.data;
        setNewPass(data)
            .then(() => dispatch(toggleRestorePass))
            .catch(err => console.log("Error with set new pass", err))
    }
};

const { reducer, actions } = profileSlice;
const { setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError,
    onChangeInput, toggleRestorePass } = actions;

export {
    reducer as profileReducer,
    setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError,
    onChangeInput, toggleRestorePass,
    getUserProfile,
    loginUser,
    registerUser,
    logoutUser,
    updateUserProfile,
    resetPass,
    restorePass,
    initialProfile
}

