import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';

const Shop = () => {
    return (
        <Layout title="SHOP" description="SEARCH AND FIND PRODUCT OF YOUR CHOICE">
            <div className="row">
                <div className="col-4">left</div>
                <div className="col-8">right</div>
            </div>
        </Layout>
    )
}

export default Shop;


