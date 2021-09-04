export const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));

export const randomRecipe = (foodsArr) => {
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
    