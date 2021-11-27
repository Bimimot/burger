import {
    profileReducer,
    setProfile, clearProfile,
    profileLoading, profileSuccess, profileIsError,
    onChangeInput, toggleRestorePass,
    initialProfile
} from './profile';


test('Profile reducer return the initial state', () => {
    expect(profileReducer(undefined, {})).toEqual(initialProfile)
});

test('Profile reducer clearProfile', () => {
    const previousState = {
        ...initialProfile,
        user: {
            email: "eeee@aaaa.uu",
            name: "Yeah",
            isAuth: false
        },};
    expect(profileReducer(previousState, clearProfile())).toEqual(initialProfile)
});

test('Profile reducer loading', () => {
    const previousState = initialProfile;
    expect(profileReducer(previousState, profileLoading())).toEqual(
        {
            ...previousState,
             profileIsLoading: true,
             profileIsError: false,
            porfileIsLoaded: false
        })
});

test('Profile reducer error', () => {
    const previousState = initialProfile;
    expect(profileReducer(previousState, profileIsError())).toEqual(
        {
            ...previousState,
            profileIsLoading: false,
            profileIsError: true,
            porfileIsLoaded: false
        })
});

test('Profile reducer success', () => {
    const previousState = initialProfile;
    expect(profileReducer(previousState, profileSuccess())).toEqual(
        {
            ...previousState,
            profileIsLoading: false,
            profileIsError: false,
            porfileIsLoaded: true
        })
});

test('Profile reducer setProfile', () => {
    const previousState = initialProfile;
    const user = { email: "a@a", name: "Kolyamba" };

    expect(profileReducer(previousState, setProfile(user))).toEqual(
        {
            ...previousState,
            user: { ...user, isAuth: true },             
            form: {
                ...previousState.form,
                inputs:
                {   ...previousState.form.inputs,
                    email: "a@a",
                    name: "Kolyamba"
                }
            }
        })
});

test('Profile reducer changeInput', () => {
    const previousState = {
        ...initialProfile,
        form: {
            inputs: {
                email: "a@a",
                name: "Kolyamba"
            }
        }
    };
    const input = { key: "email", value: "b@b" };

    expect(profileReducer(previousState, onChangeInput(input))).toEqual(
        {
            ...previousState,
            form: {
                inputs:
                {
                    email: "b@b",
                    name: "Kolyamba"    
                }
            }
        })
});

test('Profile reducer toggleRestore', () => {
    const previousState = {
        ...initialProfile,
        user: {
            ...initialProfile.user,
            canRestorePass: false
        }        
    };
    expect(profileReducer(previousState, toggleRestorePass())).toEqual(
        {
            ...previousState,
            user: {
                ...previousState.user,
                canRestorePass: true
            }
        })
});
