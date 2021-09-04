export const baseUrl = 'https://norma.nomoreparties.space/api';

export const loadFoods = () =>
    fetch(`${baseUrl}/ingredients`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`)
        });

export const loadOrderNumber = (arrIngredients) =>
    fetch(`${baseUrl}/orders`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ ingredients: arrIngredients})
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`)
        });