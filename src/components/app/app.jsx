import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getFoods } from '../../services/slicers/foods';
import { PageBurgerConstructor } from '../../pages';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoods())
  }, []);

  return (
    <>
      <AppHeader />
      <main className={styles.main}>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact>
              <PageBurgerConstructor />
            </Route>

            <Route path='/login' exact>
              <h1> Login</h1>
            </Route>

            <Route path='/register' exact>
              <h1> Register</h1>
            </Route>

            <Route path='/forgot-password' exact>
              <h1>Forgot password</h1>
            </Route>

            <Route path='/profile' exact>
              <h1>Profile</h1>
            </Route>

            <Route path='/ingredients/:id' exact>
              <h1>Ingredient</h1>
            </Route>

            <Route>
              <h1>404 page</h1>
            </Route>
          </Switch>
        </BrowserRouter>

      </main >
    </>
  )
};

