import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart, removeItem } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items.</h2>
                <hr/>
                {items.map((prod, idx) => (
                        <Card key={idx} product={prod} showAddToCartButton={false} cartUpdate={true} showRemoveProductButton={true} setRun={setRun} run={run} />
                ))}
            </div>
        )
    };

    const noItemsMessage = () => (
        <h2>Your cart is empty. <Link to="/shop">Choose a product from the shop</Link></h2>
    );

    return (
        <Layout className="container-fluid" title="SHOPPING CART" description="MANAGE YOUR CART">
            <div className="row">
                <div className="col-6">
                    {items.length > 0 ? showItems(items) : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h2>Your Cart Summary</h2>
                    <hr/>
                    <Checkout products={items} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart;


