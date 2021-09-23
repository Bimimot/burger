import React from 'react';
import { protecRouteProptypes } from '../../utils/proptypes';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
    ProtectedRoute.propTypes = protecRouteProptypes;

    const isAuth = useSelector(store => store.profile.user.isAuth);
    
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth
                    ? (children)
                    : (<Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }}/>)
            }
        />
    )
}
