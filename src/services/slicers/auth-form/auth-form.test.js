
import {
    authFormReducer,
    setInputs, clearForm, handleInput, handleIcon,
    initialAuth
} from './auth-form';


test('AuthForm reducer return the initial state', () => {
    expect(authFormReducer(undefined, {})).toEqual(initialAuth)
});

test('AuthForm reducer set inputs values', () => {
    const previousState = {};
    const arrInputs = [
        { type: "email" },
        { type: "password" },
    ];
    expect(authFormReducer(previousState, setInputs(arrInputs))).toEqual(
        {
            arrInputs: [
                { type: "email", valid: false, error: "", icon: undefined },
                { type: "password", valid: false, error: "", icon: "HideIcon" },
            ]
        })
});

test('AuthForm reducer clear form', () => {
    const previousState = {
        arrInputs: [
            { type: "email" },
            { type: "password" },
        ],
        data: { email: "a", password: "1234" }
    };
    expect(authFormReducer(previousState, clearForm())).toEqual(initialAuth)
});

test('AuthForm handle input', () => {
    const previousState = {
        arrInputs: [
            { name: "email", value: "a" },
            { name: "password", value: "1234" },
        ],
        data: { email: "a", password: "1234" }
    };

    const input = { name: "email", value: "abc@" };
    expect(authFormReducer(previousState, handleInput(input))).toEqual({
        arrInputs: [
            { name: "email", value: "abc@" },
            { name: "password", value: "1234" },
        ],
        data: { email: "abc@", password: "1234" }
    })
});

test('AuthForm reducer handle icon', () => {
    const previousState = {
        arrInputs: [
            { type: "email", name: "email", valid: false, error: "", icon: undefined },
            { type: "password", name: "password", valid: false, error: "", icon: "HideIcon" },
        ]
    };

    const input = previousState.arrInputs[1];

    expect(authFormReducer(previousState, handleIcon(input))).toEqual(
        {
            arrInputs: [
                { type: "email", name: "email", valid: false, error: "", icon: undefined },
                { type: "text", name: "password", valid: false, error: "", icon: "ShowIcon" },
            ]
        })
});