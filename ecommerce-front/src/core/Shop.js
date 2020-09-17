import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories } from './apiCore';
import Checkbox from './Checkbox';

const Shop = () => {
    const [ categories, setCategories ] = useState([]);
    const [ error, setError ] = useState(false);

     //LOAD CATEGORIES AND SET FORM DATA
     const init = () => {
        getCategories()
            .then(data => {
                if(data.error) {
                    setError( data.error );
                } else {
                    setCategories( data );
                }
            })
    };

    useEffect(() => {
        init();
    }, [])

    return (
        <Layout title="SHOP" description="SEARCH AND FIND PRODUCT OF YOUR CHOICE">
            <div className="row">
                <div className="col-4">
                    <h4>Filter By categories</h4>
                    <ul>
                        <Checkbox categories={categories} />
                    </ul>
                </div>
                <div className="col-8">right</div>
            </div>
        </Layout>
    )
}

export default Shop;


