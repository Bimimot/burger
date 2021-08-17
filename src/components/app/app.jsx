import { AppHeader } from '../app-header/app-header';
import styles from './app.module.css';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { foods, recipe } from '../../utils/data';

export const App = () => {

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <div className={styles.content}>
          <BurgerIngredients ingredients={foods} />
          <BurgerConstructor recipe={recipe} />
        </div>
      </main>
    </>
  )
};

