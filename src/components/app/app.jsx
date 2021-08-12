import React from 'react';
import {AppHeader} from '../app-header/app-header';
import styles from './app.module.css';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.flexRow}>
          <BurgerConstructor />
          <BurgerIngredients />
        </main>
      </div>
    )
  }
}


