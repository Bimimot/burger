import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { isUserAuth } from '../../utils/helpers';

export const ProtectedRoute = ({ ...props }) => {
    
    
    return (
        !!isUserAuth() ? <Route {...props} /> : <Redirect to='./404' />)
}
