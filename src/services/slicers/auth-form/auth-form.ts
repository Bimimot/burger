import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { TAuthFormState } from './auth-form-types';
import { Tinput, Tinputs, Idata } from '../../../utils/proptypes';

export const initialAuth: TAuthFormState = {
    arrInputs: [],
    data: {} //all values of form       
};

export const authSlice = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers: {
        setInputs: (state, action: PayloadAction<Tinputs>) => {
            const inputs = action.payload;

            state.arrInputs = inputs.map(input => ({
                ...input,
                icon: input.type === "password" ? "HideIcon" : input.icon,
                valid: false,
                error: ""
            }))
        },
        clearForm: (state) => initialAuth,
        handleInput: (state, action: PayloadAction<Tinput>) => {
            const { name, value } = action.payload;
            state.data = { ...state.data, [name]: value }
            state.arrInputs = state.arrInputs.map(input => input.name === name ? { ...input, value } : input);

        },
        handleIcon: (state, action: PayloadAction<Tinput>) => {
            const input = action.payload;
            if (input.name === "password") {
                state.arrInputs = state.arrInputs.map(inputState =>
                    input.name === inputState.name
                        ? {
                            ...input,
                            type: input.type === "password" ? "text" : "password",
                            icon: input.type === "password" ? "ShowIcon" : "HideIcon"
                        }
                        : inputState);
            }
        }
    }
});


const { reducer, actions } = authSlice;
const { setInputs, clearForm, handleInput, handleIcon  } = actions;
export {
    reducer as authFormReducer,
    setInputs, clearForm, handleInput, handleIcon
};