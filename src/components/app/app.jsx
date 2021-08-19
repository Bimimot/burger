import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ErrorMessage } from '../error-message/error-message';
import { Loader } from '../loader/loader';
import { recipe, urlApi } from '../../utils/data';

export const App = () => {
  const [state, setState] = useState({
    foods: [],
    isLoading: false,
    isError: false
  });
  
  useEffect(() => {
    const getFoods = async () => {
      setState({ ...state, isLoading: true });
      fetch(urlApi)
        .then(res => res.json())
        .then(result => setState({ ...state, isLoading: false, foods: result.data }))
        .catch(e => setState({ ...state, isError: true, isLoading: false }));
    };
    getFoods();
  }, []);

  console.log("APP state", state);
  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {(!state.isLoading && !state.isError)
          && <div className={styles.content}>
            <BurgerIngredients ingredients={state.foods} />
            <BurgerConstructor recipe={recipe} />
          </div>
        }
        {state.isLoading && <Loader text={"Обновляем меню" }/>}
        {state.isError && <ErrorMessage />}
      </main>
    </>
  )
};

