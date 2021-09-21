import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from './app.module.css';

import { ProtectedRoute } from '../protected-route/protected-route';
import { AppHeader } from '../app-header/app-header';
import { getFoods } from '../../services/slicers/foods';
import {
  PageBurgerConstructor,
  LoginPage, RegisterPage, ForgotPassPage, ResetPassPage,
  NoPage, IngredientPage, ProfilePage
} from '../../pages';

import { getUserProfile } from '../../services/slicers/profile';
import { isUserAuth } from '../../utils/helpers';

export const App = () => {
  const dispatch = useDispatch();
  const isAuth = isUserAuth();

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  useEffect(() => {
    if (!isAuth) {
      console.log("GET USER METHOD =>>>>>>>>>>>>>>>>>>>>>");
      dispatch(getUserProfile());
    }
  },[isAuth, dispatch])

  return (
    <BrowserRouter>
      <AppHeader />
      <main className={styles.main}>

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

          <ProtectedRoute path='/forgot-password' exact>
            <ForgotPassPage />
          </ProtectedRoute>

          <Route path='/reset-password' exact>
            <ResetPassPage />
          </Route>

          <Route path='/profile'>
            <ProfilePage />
          </Route>

          <Route path='/ingredients/:id' exact>
            <IngredientPage />
          </Route>

          <Route>
            <NoPage />
          </Route>
        </Switch>
      </main >
    </BrowserRouter>
  )
};

