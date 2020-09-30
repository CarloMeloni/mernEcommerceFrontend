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
    }, []);

    const searchSubmit = () => {
       
    };

    const handleChange = () => {
       
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('category')}>
                            <option value="All">Choose a category</option>
                            {categories.map((categ, idx) => (
                                <option key={idx} value={categ._id}>{categ.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" onChange={handleChange('search')} placeholder="Search By Name" />
                </div>
                <div className="btn input-group-append" style={{ border: 'none' }}>
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    );

    return (
        <div className="row">
            <div className="container mb-3">{searchForm()}</div>
        </div>
    )
};

export default Search;
