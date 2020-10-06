import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState([]);

    const { user, token } = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    setOrders(data);
                }
            })
    };

    const loadStatusValues = () => {
        getStatusValues(user._id, token)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    setStatus(data);
                }
            })
    };

    useEffect(() => {
        loadOrders();
        loadStatusValues();
    }, []);

    const showOrdersLength = () => {
        if(orders.length > 0 ) {
            return (
            <h2 className="text-danger display-2">Total Orders: {orders.length}</h2>
            )
        } else {
            return (
            <h2 className="text-danger display-2">No orders.</h2>
            )
        }
    };

    const showInput = (key, value) => (
        <div className="input-group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
            </div>
            <input type="text" value={value} className="form-control" readOnly />
        </div>
    );

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value)
            .then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    loadOrders();
                }
            })
    };

    const showStatus = order => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {order.status}</h3>
            <select className="fomr-control" onChange={(e) => handleStatusChange(e, order._id)}>
                <option>Update Status</option>
                {status.map((stat, idx) => (
                    <option value={stat}key={idx}>{stat}</option>
                ))}
            </select>
        </div>
    );

    return (
        <Layout title="Orders" description={`Hey ${user.name}, you can manage all the orders here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showOrdersLength(orders)}
                    {orders.map((order, orderidx) => {
                        return (
                            <div className="mt-5" key={orderidx} style={{borderBottom: '5px solid #333'}}>
                                <h2 className="mb-5">
                                    <span className="bg-primary">Order ID: {order._id}</span>
                                    <ul className="list-group mb-2">
                                        <li className="list-group-item">{showStatus(order)}</li>
                                        <li className="list-group-item">Transaction ID: {order.transaction_id}</li>
                                        <li className="list-group-item">Amount: £{order.amount}</li>
                                        <li className="list-group-item">Ordered by {order.user.name}</li>
                                        <li className="list-group-item">Ordered on {moment(order.createdAt).fromNow()}</li>
                                        <li className="list-group-item">Delivery address {order.address}</li>
                                    </ul>
                                    <h3 className="mt-4 mb-4 font-italic">
                                        Total products in the order: {order.products.length}
                                    </h3>

                                    {order.products.map((prod, prdidx) => (
                                        <div className="mb-4" key={prdidx} style={{padding: '20px', border: '1px solid #333'}}>
                                            {showInput('Product name', prod.name)}
                                            {showInput('Product price', prod.price)}
                                            {showInput('Product total', prod.count)}
                                            {showInput('Product Id', prod._id)}
                                        </div>
                                ))}
                                </h2>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default Orders;
