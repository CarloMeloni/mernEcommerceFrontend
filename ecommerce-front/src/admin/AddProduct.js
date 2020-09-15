import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import { createProduct } from './apiAdmin';

const AddProduct = () => {
    //DESTRUCTURE USER AD TOKEN FROM LOCALSTORAGE
    const { user, token } = isAuthenticated();

    return (
        <Layout title="Add a New Product" description={`Hey ${user.name}, add a new product here`}>
            <div className="row">
                <div className="col-md-8 offset-md2">
                    . . . 
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct;
