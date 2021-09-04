import { useEffect, useState, useReducer } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ErrorMessage } from '../error-message/error-message';
import { Loader } from '../loader/loader';
import { loadFoods } from '../../utils/api';
import { AllOrdersContext, BurgerContext } from '../../utils/context';
import { randomRecipe } from '../../utils/helpers';

const initialBurger = {
  recipe: [],
  totalPrice: null,
  bun: null,
  filling: []
};

function getBurgerByRecipe(recipe) {
  console.log("Recipe from getBurger", recipe);

  const bun = recipe.find(food => food.type === "bun");
  const filling = recipe.filter(food => food.type !== "bun");
  const totalPrice = filling.reduce((total, current) => total + current.price, 0)
    + (!!bun ? bun.price * 2 : 0);
  recipe = filling.concat(!!bun ? bun : []);
  return { recipe, bun, filling, totalPrice }
}

function reducerBurger(burger, action) {
  switch (action.type) {
    case "clear":
      return { ...initialBurger }

    case "random":
      return !!action.foods
        ? getBurgerByRecipe(randomRecipe(action.foods, 9))
        : burger

    case "delete":
      let delFilling = [...burger.filling];
      console.log("Action del", action);
      console.log("Burger", burger);
      if (!!burger.filling[action.fillingIndex]) {
        delFilling.splice(action.fillingIndex, 1);
      }
      return getBurgerByRecipe(delFilling.concat(burger.bun));

    case "add":
      let addRecipe = [...burger.recipe];
      if (!!action.food) {
        if (action.food.type === "bun" && !!burger.bun) {
          addRecipe.splice(
            addRecipe.findIndex(f => f.type === "bun"), 1, action.food)
        } else {
          addRecipe.push(action.food)
        }
      }
      return getBurgerByRecipe(addRecipe)

    default:
      return burger
  }
}

export const App = () => {
  const [state, setState] = useState({
    foods: [],
    isLoading: false,
    isError: false
  });

  const allOrdersState = useState([]);
  const burgerState = useReducer(reducerBurger, initialBurger);

  useEffect(() => {
    setState({ ...state, isLoading: true });
    loadFoods()
      .then(result => {
        setState({ ...state, isLoading: false, foods: result.data });
      })
      .catch(e => {
        console.log("Error:", e);
        setState({ ...state, isError: true, isLoading: false })
      })
  }, []);

  return (
    <AllOrdersContext.Provider value={allOrdersState}>
      <AppHeader />
      <main className={styles.main}>
        {(!state.isLoading && !state.isError)
          && <div className={styles.content}>
            <BurgerContext.Provider value={burgerState}>
              <BurgerIngredients ingredients={state.foods} />
              <BurgerConstructor foods={state.foods} />
            </BurgerContext.Provider>
          </div>
        }
        {state.isLoading && <Loader text={"Обновляем меню"} />}
        {state.isError && <ErrorMessage />}
      </main>
    </AllOrdersContext.Provider>
  )
};

