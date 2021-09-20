export const baseUrl = 'https://norma.nomoreparties.space/api';

const apiHandler = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

export const loadFoods = () =>
    fetch(`${baseUrl}/ingredients`)
        .then(res => apiHandler(res));

export const loadOrderNumber = (arrIngredients) =>
    fetch(`${baseUrl}/orders`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ ingredients: arrIngredients })
        })
        .then(res => apiHandler(res));

//-----------------------auth-------------------------------------

export const login = (data) =>
    //data: {"email": "", "password": ""}
    fetch(`${baseUrl}/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));

export const register = (data) =>
    //data: {"email": "", "password": "", "name": ""}
    fetch(`${baseUrl}/auth/register`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json;charset=utf-8'},
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));

export const logout = (refreshToken) =>
    fetch(`${baseUrl}/auth/logout`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ refreshToken: refreshToken })
        })
        .then(res => apiHandler(res));

export const updateToken = (refreshToken) =>
    fetch(`${baseUrl}/auth/logout`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ refreshToken: refreshToken })
        })
        .then(res => apiHandler(res));


//-----------------------reset-pass-------------------------------------

export const checkEmail = (email) =>
    fetch(`${baseUrl}/password-reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ email: email })
        })
        .then(res => apiHandler(res));

export const resetPass = (password) =>
    fetch(`${baseUrl}/password-reset/reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                password: password,
                token: ""
            })
        })
        .then(res => apiHandler(res));

