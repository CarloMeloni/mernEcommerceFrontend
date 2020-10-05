import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, getBraintreeClientToken, processPayment } from './apiCore';
import { emptyCart } from './cartHelpers';
import {isAuthenticated} from '../auth/index';
import { Link } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ products, setRun = f => f, run = undefined }) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token)
            .then(data => {
                if(data.error) {
                    setData({ ...data, error: data.error });
                } else {
                    setData({ clientToken: data.clientToken });
                }
            })
    };

    useEffect(() => {
        getToken(userId, token);
    }, []);

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0)
    };

    const showCheckout = () => {
        return isAuthenticated() 
        ? (
            <div>{showDropIn()}</div>
        ) 
        : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to Checkout</button>
            </Link>
        )};

    const buy = () => {
        //SEND THE NONCE(THE PAYMENT METHOD) TO THE BACKEND
        //nonce = data.instance.requestPaymentMethod();
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
                //console.log(data);
                nonce = data.nonce;

                //ONCE YOU HAVE NONCE (CARD TYPE, CARD NUMBER) SEND NOCE AS 'paymentMethodNonce';
                //AND ALSO THE TOTAL TO BE CHARGED
                //console.log(nonce, getTotal(products));
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };

                processPayment(userId, token, paymentData)
                    .then(response => {
                        //console.log(response);
                        setData({ ...data, success: response.success });

                        //EMPTY CART
                        emptyCart(() => { setRun(!run) });
                        //CREATE A NEW ORDER
                        
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => {
                //console.log('error', err);
                setData({ ...data, error: err.message });
            }) 

    }; 

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 
                ? (
                    <div>
                        <DropIn options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                         }}
                            onInstance={(instance) => data.instance = instance}
                          />
                        <button onClick={buy} className="btn btn-success btn-block">Pay</button>
                    </div>
                ) 
                : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thank you! Payment was successful.
        </div>
    );

    return (
        <div>
           <h2>Total: £{getTotal()}</h2>
            {showError(data.error)}
            {showSuccess(data.success)}
            {showCheckout()}
        </div>
    )
}

export default Checkout;
