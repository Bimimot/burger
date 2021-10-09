import { updateToken } from "./api";
import { Tfood } from "./proptypes";

export const randomInteger = (min: number, max: number): number => Math.floor(min + Math.random() * (max + 1 - min));

//------------------------burger reducer---------------------------------
export const createRandomRecipe = (foodsArr: Array<Tfood>): Array<Tfood> => {
    const recipe: Array<Tfood> = [];
    const count = randomInteger(6, 10);

    for (let i = 0; i < count; i++) {
        recipe[i] = foodsArr[randomInteger(0, foodsArr.length - 1)];
    }

    if (!!!recipe.find(f => f.type === "bun")) {
        const bun: Tfood | undefined = foodsArr.find(f => f.type === "bun");
        if (typeof bun !== 'undefined') {
            recipe.push(bun)
        }
    }
    return recipe
}

export function getBurgerByRecipe(recipe: Array<Tfood>): {
    recipe: Array<Tfood>,
    bun: Tfood | undefined | null,
    filling: Array<Tfood>,
    totalPrice: number | null
} {
    const bun: Tfood | undefined = recipe.find(food => food.type === "bun");
    const filling: Array<Tfood> = recipe.filter(food => food.type !== "bun").map((f, i) => ({ ...f, unicId: i + f._id }));
    const totalPrice: number = filling.reduce((total, current) => total + current.price, 0)
        + (!!bun ? bun.price * 2 : 0);
    recipe = filling.concat(!!bun ? bun : []);
    return { recipe, bun, filling, totalPrice }
}

//------------------------------cookie------------------------------------
export function getCookie(name: string): string | undefined {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
    name: string,
    value: string | number | boolean | null,
    props?: any): void {
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
    value = encodeURIComponent(value !==null ? value : '');
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

//---------------------------------auth--------------------------------------------------

export async function isTokenValid(): Promise<boolean> {
    let isAuth = false;
    const token = localStorage.getItem('refreshToken');

    if (!!token && token !== 'undefined') {
        await updateToken()
            .then(() => isAuth = true)
            .catch(err => {
                console.log("Error with toekn update:", err);
                isAuth = false;
            })
    }
    return isAuth
}
