import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';

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
        getProducts('createdAt')
            .then(data => {
                if(data.error) {
                    setError(data.error);
                } else {
                    setProductByArrival(data);
                }
            })
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout title="HOME" description="NODE REACT E-COMMERCE WEB APPLICATION">
            {JSON.stringify(productsByArrival)}
            <hr/>
            {JSON.stringify(productsBySell)}
        </Layout>
    )
};

export default Home;
