import React, { useState, useEffect } from 'react';
import { getCategories } from './apiCore';
import Card from './Card';

const Search = () => {
    const [ data, setdata ] = useState({
        categories: [],
        category: '',
        search: '',
        result: [],
        searched: false
    });

    const {
        categories,
        category,
        search,
        result,
        searched
    } = data;

    const loadCategories = () => {
        getCategories().then(data => {
                if(data.error) {
                    console.log(data.error);
                } else {
                    setdata({ ...data, categories: data })
            }
        })
    }

    useEffect(() => {
        loadCategories();
    }, [])

    return (
        <div>
            <h2>Search bar! {JSON.stringify(categories)}</h2>
        </div>
    )
};

export default Search;
