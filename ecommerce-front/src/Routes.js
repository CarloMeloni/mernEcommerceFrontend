import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './core/Home';
import Shop from './core/Shop';
import Cart from './core/Cart';
import Product from './core/Product';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import DashBoard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Orders from './admin/Orders';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/shop' component={Shop} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/product/:productId' component={Product} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/signin' component={Signin} />
                <PrivateRoute exact path='/user/dashboard' component={DashBoard} />
                <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
                <AdminRoute exact path='/create/category' component={AddCategory} />
                <AdminRoute exact path='/create/product' component={AddProduct} />
                <AdminRoute exact path='/admin/orders' component={Orders} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;