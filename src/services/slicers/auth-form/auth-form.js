import { createSlice } from '@reduxjs/toolkit';

export const initialAuth = {
    arrInputs: [],
    data: {} //all values of form       
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuth,
    reducers: {
        setInputs: (state, action) => {
            const inputs = action.payload;

            state.arrInputs = inputs.map(input => ({
                ...input,
                icon: input.type === "password" ? "HideIcon" : input.icon,
                valid: false,
                error: ""
            }))
        },
        clearForm: (state) => initialAuth,
        handleInput: (state, action) => {
            const { name, value } = action.payload;
            state.data = { ...state.data, [name]: value }
            state.arrInputs = state.arrInputs.map(input => input.name === name ? { ...input, value } : input);

        },
        handleIcon: (state, action) => {
            const input = action.payload;
            if (input.name === "password") {
                const newInputState = {
                    ...input,
                    type: input.type === "password" ? "text" : "password",
                    icon: input.type === "password" ? "ShowIcon" : "HideIcon"
                };

                state.arrInputs = state.arrInputs.map(inputState =>
                    inputState.name === input.name ? newInputState : inputState);

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