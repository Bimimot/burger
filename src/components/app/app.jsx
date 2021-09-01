import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ErrorMessage } from '../error-message/error-message';
import { Loader } from '../loader/loader';
import { recipe, urlApi } from '../../utils/data';
import { loadFoods } from '../../utils/api';

export const App = () => {
  const [state, setState] = useState({
    foods: [],
    isLoading: false,
    isError: false,
    recipe: recipe
  });
  
  useEffect(() => {
      setState({ ...state, isLoading: true });
      loadFoods()
        .then(result => setState({ ...state, isLoading: false, foods: result.data }))
        .catch(e => {
          console.log("Error:", e);
          setState({ ...state, isError: true, isLoading: false })
        })        
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {(!state.isLoading && !state.isError)
          && <div className={styles.content}>
            <BurgerIngredients ingredients={state.foods} />
            <BurgerConstructor recipe={state.recipe} />
          </div>
        }
        {state.isLoading && <Loader text={"Обновляем меню" }/>}
        {state.isError && <ErrorMessage />}
      </main>
    </>
  )
};

