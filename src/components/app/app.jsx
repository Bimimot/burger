import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getFoods } from '../../services/slicers/foods';
import {
  PageBurgerConstructor,
  LoginPage, RegisterPage, ForgotPassPage, ResetPassPage,
  NoPage, IngredientPage
} from '../../pages';

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
              <LoginPage />
            </Route>

            <Route path='/register' exact>
              <RegisterPage />
            </Route>

            <Route path='/forgot-password' exact>
              <ForgotPassPage />
            </Route>

            <Route path='/reset-password' exact>
              <ResetPassPage />
            </Route>

            <Route path='/profile' exact>
              <h1>Profile</h1>
            </Route>

            <Route path='/ingredients/:id' exact>
              <IngredientPage />
            </Route>
{/* 
            <Route>
              <NoPage />
            </Route> */}
          </Switch>
        </BrowserRouter>
      </main >
    </>
  )
};

