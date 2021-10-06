import { getCookie, setCookie } from "./helpers";
export const baseUrl = 'https://norma.nomoreparties.space/api';
const apiHandler = (res) => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);


export const loadFoods = () =>
    fetch(`${baseUrl}/ingredients`)
        .then(res => apiHandler(res));

export const loadOrderNumber = (arrIngredients) =>
    fetch(`${baseUrl}/orders`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + getCookie('accessToken')
            },
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
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));

export const logout = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return fetch(`${baseUrl}/auth/logout`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': refreshToken
            },
            body: JSON.stringify({ token: refreshToken })
        })
        .then(res => apiHandler(res));
}

export const updateToken = () => {
    const refreshToken = localStorage.getItem('refreshToken');

    return fetch(`${baseUrl}/auth/token`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': refreshToken
            },
            body: JSON.stringify({ token: refreshToken })
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`))
        .then(res => {
            localStorage.setItem('refreshToken', res.refreshToken);
            setCookie("accessToken", res.accessToken.split('Bearer ')[1]);
            return res
        })
}


//-----------------------user-------------------------------------------
export const getUser = () => {
    const accessToken = getCookie('accessToken');

    if (!!accessToken) {
        return fetch(`${baseUrl}/auth/user`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': 'Bearer ' + accessToken
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
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + getCookie('accessToken')
            },
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));
}
//-----------------------reset-pass-------------------------------------

export const checkEmail = (data) =>
    fetch(`${baseUrl}/password-reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(data)
        })
        .then(res => apiHandler(res));

export const setNewPass = (data) =>
    fetch(`${baseUrl}/password-reset/reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({ data })
        })
        .then(res => apiHandler(res));

