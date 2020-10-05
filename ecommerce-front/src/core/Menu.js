import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { itemTotal } from './cartHelpers';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return { borderBottom: "2px solid #ffffff", color: "#ffffff"  }
    } else {
        return { color: "#ffffff" }
    }
};

const Menu = (props) => {
    return (
        <div>
            <ul className="navbar navbar-dark bg-dark" style={{listStyle: 'none', marginBottom: 0}}>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/')} to="/">HOME</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/shop')} to="/shop">SHOP</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/cart')} to="/cart">CART <sup><small className="cart-badge">{itemTotal()}</small></sup> </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/user/dashboard')} to="/user/dashboard">DASHBOARD</Link>
                </li>)}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/admin/dashboard')} to="/admin/dashboard">ADMIN DASHBOARD</Link>
                </li>)}
                {!isAuthenticated() && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/signin')} to="/signin">SIGNIN</Link>
                </li>)}
                {!isAuthenticated() && (<li className="nav-item">
                    <Link className="nav-link" style={isActive(props.history, '/signup')} to="/signup">SIGNUP</Link>
                </li>)}
                {isAuthenticated() && (<li className="nav-item">
                    <span 
                        className="nav-link" 
                        style={{cursor: 'pointer', color: '#ffffff'}} 
                        onClick={() => {
                            signout(() => { props.history.push('/') })
                        }}>
                            LOGOUT
                    </span>
                </li>)}
            </ul>
        </div>
    )
}

export default withRouter(Menu);
