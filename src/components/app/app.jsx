import { useEffect, useState, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ErrorMessage } from '../error-message/error-message';
import { Loader } from '../loader/loader';

import { AllOrdersContext } from '../../utils/context';

import { getFoods } from '../../services/slicers/foods';

// const initialBurger = {
//   recipe: [],
//   totalPrice: null,
//   bun: null,
//   filling: []
// };

// function getBurgerByRecipe(recipe) {

//   const bun = recipe.find(food => food.type === "bun");
//   const filling = recipe.filter(food => food.type !== "bun");
//   const totalPrice = filling.reduce((total, current) => total + current.price, 0)
//     + (!!bun ? bun.price * 2 : 0);
//   recipe = filling.concat(!!bun ? bun : []);
//   return { recipe, bun, filling, totalPrice }
// }

// function reducerBurger(burger, action) {
//   switch (action.type) {
//     case "clear":
//       return { ...initialBurger }

//     case "random":
//       return !!action.items
//         ? getBurgerByRecipe(randomRecipe(action.items))
//         : burger

//     case "delete":
//       let delFilling = [...burger.filling];
//       console.log("Action del", action);
//       console.log("Burger", burger);
//       if (!!burger.filling[action.fillingIndex]) {
//         delFilling.splice(action.fillingIndex, 1);
//       }
//       return getBurgerByRecipe(delFilling.concat(burger.bun));

//     case "add":
//       let addRecipe = [...burger.recipe];
//       if (!!action.food) {
//         if (action.food.type === "bun" && !!burger.bun) {
//           addRecipe.splice(
//             addRecipe.findIndex(f => f.type === "bun"), 1, action.food)
//         } else {
//           addRecipe.push(action.food)
//         }
//       }
//       return getBurgerByRecipe(addRecipe)

//     default:
//       return burger
//   }
// }

export const App = () => {
 

  //--------------REDUX--------------------
  const store = useSelector(store => store);
  const { isLoading, isError} = useSelector(store => store.foods);
  console.log("STORE from App: ", store);

  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(getFoods())
  }, []  );
  //----------------------------------------

  const allOrdersState = useState([]);
  //const burgerState = useReducer(reducerBurger, initialBurger);


  return (
    <AllOrdersContext.Provider value={allOrdersState}>
      <AppHeader />
      <main className={styles.main}>
        {(!isLoading && !isError)
          && <div className={styles.content}>
            {/* <BurgerContext.Provider value={burgerState}> */}
              <BurgerIngredients />
              <BurgerConstructor />
            {/* </BurgerContext.Provider> */}
          </div>
        }
        {isLoading && <Loader text={"Обновляем меню"} />}
        {isError && <ErrorMessage />}
      </main>
    </AllOrdersContext.Provider>
  )
};

