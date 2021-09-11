import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { ErrorMessage } from '../error-message/error-message';
import { Loader } from '../loader/loader';
import { getFoods } from '../../services/slicers/foods';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const App = () => {
  const { isLoading, isError } = useSelector(store => store.foods);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods())
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        {(!isLoading && !isError)
          &&
          <DndProvider backend={HTML5Backend}>
            <div className={styles.content}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </DndProvider>
        }
        {isLoading && <Loader text={"Обновляем меню"} />}
        {isError && <ErrorMessage />}
      </main>
    </>
  )
};

