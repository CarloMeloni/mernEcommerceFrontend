import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import DashBoard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <PrivateRoute exact path='/user/dashboard' component={DashBoard} />
                <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;