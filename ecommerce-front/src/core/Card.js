import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment from 'moment';
import { addItem, updateItem } from './cartHelpers';

const Card = ({ product, showViewProductButton = true, showAddToCartButton = true, cartUpdate = false }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showStock = quantity => {
        return quantity > 0 
            ? <span className="badge badge-primary badge-pill">In stock</span> 
            : <span className="badge badge-primary badge-pill">Out of stock</span> 
    };

    const handleChange = id => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if(event.target.value >= 1) {
            updateItem(id, event.target.value)
        }
    }

    const showCartUpdateOptions = (cartUpdate) => {
        return cartUpdate && 
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Adjust quantity</span>    
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />      
            </div>    
        </div>
    };

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
                    {showCartUpdateOptions(cartUpdate)}
                </div>
            </div>
    )
}

export default Card;
