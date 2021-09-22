import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';

export const ProtectedRoute = ({ children, ...rest }) => {
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
