import { useEffect, FC } from 'react';
import { useDispatch } from '../../services/types/hooks-types';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import styles from './app.module.css';

import { ProtectedRoute } from '../protected-route/protected-route';
import { AppHeader } from '../app-header/app-header';
import { getFoods } from '../../services/slicers/foods/foods';
import {
  BurgerConstructorPage,
  LoginPage, RegisterPage, ForgotPassPage, ResetPassPage,
  NoPage, IngredientPage, IngredientPageModal, ProfilePage,
  FeedPage, BurgerOrderPage, BurgerOrderModal
} from '../../pages';

import { getUserProfile } from '../../services/slicers/profile/profile';
import { IlocationState } from '../../utils/proptypes';

export const App: FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let location = useLocation<IlocationState>();

  useEffect(() => {
    dispatch(getFoods());
    dispatch(getUserProfile());
  }, []);

  let background = (location.state && history.action.toLowerCase() === "push")
    && location.state.background;

  return (
    <>
      <AppHeader />
      <main className={styles.main}>

        <Switch location={background || location}>

          <ProtectedRoute path='/profile'>
            <ProfilePage />
          </ProtectedRoute>

          <Route path='/' exact>
            <BurgerConstructorPage />
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

          <Route path='/feed' exact>
            <FeedPage />
          </Route>

          <Route path='/feed/:id' exact>
            <BurgerOrderPage type={"feed"} />
          </Route>

          <Route path='/ingredients/:id' exact>
            <IngredientPage />
          </Route>

          <Route>
            <NoPage />
          </Route>
        </Switch>

        {background &&
          <>
            <Route path='/ingredients/:id' exact>
              <IngredientPageModal />
            </Route>

            <Route path='/feed/:id' exact>
              <BurgerOrderModal />
            </Route>

            <ProtectedRoute path='/profile/orders/:id' exact>
              <BurgerOrderModal />
            </ProtectedRoute>
          </>
        }
      </main >
    </>
  )
};

