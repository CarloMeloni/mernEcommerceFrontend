import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment from 'moment';
import { addItem } from './cartHelpers';

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true }) => {
    const [redirect, setRedirect] = useState(false);

    const showStock = quantity => {
        return quantity > 0 
            ? <span className="badge badge-primary badge-pill">In stock</span> 
            : <span className="badge badge-primary badge-pill">Out of stock</span> 
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true);
        })
    };

    const shouldRedirect = (redirect) => {
        if(redirect) {
            return <Redirect to='/cart' />
        }
    };

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product" />
                    <p className="lead mt-2">{product.description.substring(0, 100)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-8">Category: {product.category && product.category.name}</p>
                    <p className="black-8">Added on {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}
                    <br/>
                    <Link to={`/product/${product._id}`}>
                        {showViewProductButton && <button  className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>}
                    </Link>
                    {showAddToCartButton && <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">Add To Cart</button>}
                </div>
            </div>
    )
}

export default Card;
