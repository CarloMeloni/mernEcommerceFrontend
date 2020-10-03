import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';

const Cart = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(getCart());
    }, []);

    const showItems = items => {
        return (
            <div>
                <h2>Your cart has {`${items.length}`} items.</h2>
                <hr/>
                {items.map((prod, idx) => (
                        <Card key={idx} product={prod} showAddToCartButton={false} />
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
                    <p>SHOW CHECKOUT OPTIONS!</p>
                </div>
            </div>
        </Layout>
    )
}

export default Cart;


