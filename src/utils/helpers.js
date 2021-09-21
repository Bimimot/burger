export const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

//------------------------burger reducer---------------------------------
export const createRandomRecipe = (foodsArr) => {
    const recipe = [];
    const count = randomInteger(6, 10);

    for (let i = 0; i < count; i++) {
        recipe[i] = foodsArr[randomInteger(0, foodsArr.length - 1)];
    }
    if (!!!recipe.find(f => f.type === "bun")) {
        recipe.push(foodsArr.find(f => f.type === "bun"))
    }
    return recipe
}

export function getBurgerByRecipe(recipe) {
    const bun = recipe.find(food => food.type === "bun");
    const filling = recipe.filter(food => food.type !== "bun").map((f, i) => ({ ...f, unicId: i + f._id }));
    const totalPrice = filling.reduce((total, current) => total + current.price, 0)
        + (!!bun ? bun.price * 2 : 0);
    recipe = filling.concat(!!bun ? bun : []);
    return { recipe, bun, filling, totalPrice }
}

//------------------------------cookie------------------------------------
export function getCookie(name) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}
