import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import Card from './Card';
import { getCategories, getFilteredProducts } from './apiCore';
import Checkbox from './Checkbox';
import { prices } from './FixedPrices';
import RadioBox from './RadioBox';

const Shop = () => {
    const [ myFilters, setMyFilters ] = useState({
        filters: { category: [], price: [] }
    });
    const [ categories, setCategories ] = useState([]);
    const [ error, setError ] = useState(false);
    const [ limit, setLimit ] = useState(6);
    const [ skip, setSkip ] = useState(0);
    const [ size, setSize ] = useState(0);
    const [ filteredResult, setFilteredResult ] = useState([]);

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

    const loadFilteredResult = (newFilters) => {
        getFilteredProducts(skip, limit, newFilters)
            .then(data => {
                if(data.error) {
                    setError(data.error); 
                } else {
                    setFilteredResult(data.data);
                    setSize(data.size);
                    setSkip(0);
                }
            })
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        getFilteredProducts(toSkip, limit, myFilters.filters)
            .then(data => {
                if(data.error) {
                    setError(data.error); 
                } else {
                    setFilteredResult([ ...filteredResult, ...data.data]);
                    setSize(data.size);
                    setSkip(toSkip);
                }
            })
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">Load More</button>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResult(skip, limit, myFilters.filters)
    }, []);

    const handleFilters = (filters, filterBy) => {
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if(filterBy == 'price') {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResult(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let arr = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value)) {
                arr = data[key].array;
            }
        }
        return arr;
    }; 

    return (
        <Layout title="SHOP" description="SEARCH AND FIND PRODUCT OF YOUR CHOICE">
            <div className="row">
                <div className="col-4">
                    <h4>Filter By categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, 'category')} />
                    </ul>

                    <h4>Filter By Price Range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, 'price')} />
                    </div>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filteredResult.map((product, idx)  => (
                                <Card key={idx} product={product} />
                        ))}
                    </div>
                    <hr/>
                    {loadMoreButton()}
                </div>
            </div>
        </Layout>
    )
}

export default Shop;


