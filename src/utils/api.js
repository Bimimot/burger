import { getCookie } from "./helpers";


const baseUrl = 'https://norma.nomoreparties.space/api';
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

export const logout = () => {
    const token = localStorage.getItem('refreshToken');
    console.log("Refresh token from localStorage", token);

    return fetch(`${baseUrl}/auth/logout`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ token} )
        })
        .then(res => apiHandler(res));
}

export const updateToken = () =>
    fetch(`${baseUrl}/auth/logout`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
        })
        .then(res => apiHandler(res));

//-----------------------user-------------------------------------------
// GET https://norma.nomoreparties.space/api/auth/user - эндпоинт получения данных о пользователе.  
// PATCH https://norma.nomoreparties.space/api/auth/user - эндпоинт обновления данных о пользователе.

export const getUser = () => {
    const token = getCookie('token');
    console.log("ACCESS TOKEN from cookie before api.getUser", token);


    if (!!token) {
        return fetch(`${baseUrl}/auth/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(res => apiHandler(res));
    } else {
        return Promise.reject(`Профиль не может быть получен: нет токена`)
    }
}


export const updateUser = (data) => {
    fetch(`${baseUrl}/auth/user`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + getCookie('token')
            },
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));
}
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

