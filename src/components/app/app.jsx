import React from 'react';
import {AppHeader} from '../app-header/app-header';
import styles from './app.module.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { foods, recipe } from '../../utils/data';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
        <>
        <AppHeader />
        <main className={styles.main}>
          <div className={styles.content}>            
            <BurgerIngredients foods={foods}/>
            <BurgerConstructor recipe={recipe} />
          </div>
        </main>
        </>
    )
  }
};

