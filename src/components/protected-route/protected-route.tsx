import React, {FC} from 'react';
import { Route, Redirect } from "react-router-dom";
import { useSelector } from '../../services/types/hooks-types';

export const ProtectedRoute:FC<{path? : string, exact?: boolean}> = ({ children, ...rest }) => {
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
