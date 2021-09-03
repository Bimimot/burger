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

export const App = () => {
  const initialBurger = {
    recipe: [],
    totalPrice: null,
    isReal: false,
    bun: null,
    filling: []
  };

  function getBurgerByRecipe(recipe) {
    const bun = recipe.find(food => food.type === "bun");
    const filling = recipe.filter(food => food.type !== "bun");
    const totalPrice = filling.reduce((total, current) => total + current.price, 0)
      + (!!bun ? bun.price * 2 : 0);
    const isReal = !!bun && !!filling.length;
    recipe = filling.concat(!!bun ? bun : []);
    return { recipe, isReal, bun, filling, totalPrice }
  }

  function reducerBurger(burger, action) {
    switch (action.type) {
      case "clear":
        return { ...initialBurger }

      case "random":
        return getBurgerByRecipe(
          randomRecipe(state.foods, 12)
        );

      case "del":
        return !!action.food
          ? getBurgerByRecipe(burger.recipe.filter(f =>
            f._id !== action.food._id)
          )
          : burger.recipe;

      case "add":
        let addRecipe = [...burger.recipe];
        if (!!action.food) {
          addRecipe = (action.food._id === "bun" && !!burger.bun)
            ? addRecipe.splice(addRecipe.findIndex(f => f._id === "bun"), action.food)
            : addRecipe.push(action.food)
        }
        return getBurgerByRecipe(addRecipe)

      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }

  const [state, setState] = useState({
    foods: [],
    isLoading: false,
    isError: false
  });

  const allOrdersState = useState([]);

  const burgerState = useReducer(reducerBurger, initialBurger);
  const [burger, dispatchBurger] = burgerState;

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

  useEffect(() => {
    if (!!state.foods.length) {
      dispatchBurger({ type: "random" })
    }
  }, [state.foods])

  return (
    <AllOrdersContext.Provider value={allOrdersState}>
      <AppHeader />
      <main className={styles.main}>
        {(!state.isLoading && !state.isError)
          && <div className={styles.content}>
            <BurgerContext.Provider value={burgerState}>
              <BurgerIngredients ingredients={state.foods} />
              <BurgerConstructor />
            </BurgerContext.Provider>
          </div>
        }
        {state.isLoading && <Loader text={"Обновляем меню"} />}
        {state.isError && <ErrorMessage />}
      </main>
    </AllOrdersContext.Provider>
  )
};

