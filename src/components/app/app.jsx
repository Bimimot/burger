import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { getFoods } from '../../services/slicers/foods';
import {
  PageBurgerConstructor,
  LoginPage, RegisterPage, ForgotPassPage, ResetPassPage,
  NoPage, IngredientPage, ProfilePage
} from '../../pages';

import { getUserProfile } from '../../services/slicers/profile';
import { getCookie } from '../../utils/helpers';

export const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(store => store.profile.user);

  useEffect(() => {
    dispatch(getFoods());
  }, []);

  useEffect(() => {
    if (!user.name || !user.mail) {
      console.log("GET USER METHOD =>>>>>>>>>>>>>>>>>>>>>");
      dispatch(getUserProfile());
    }
  },[user])

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

          <Route path='/forgot-password' exact>
            <ForgotPassPage />
          </Route>

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

