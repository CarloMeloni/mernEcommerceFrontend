import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [ productsBySell, setProductBySell ] = useState([]);
    const [ productsByArrival, setProductByArrival ] = useState([]);
    const [ error, setError ] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold')
            .then(data => {
                if(data.error) {
                    setError(data.error);
                } else {
                    setProductBySell(data);
                }
            })
    };

    const loadProductsByArrival = () => {
        getProducts('sold').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout className="container-fluid" title="HOME" description="NODE REACT E-COMMERCE WEB APPLICATION">
            
            <Search />
            <h2 className="mb-4">New Arrivals</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 className="mb-5">Best Sellers</h2>
            <div className="row mb-5">
                {productsBySell.map((product, idx) => (
                    <div key={idx} className="col-3 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    )
};

export default Home;
