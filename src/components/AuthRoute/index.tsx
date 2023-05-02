import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../Auth';

const AuthRoute = () => {
    return  isLoggedIn() ? <Outlet /> : <Navigate to={"/"} />
}

export default AuthRoute;