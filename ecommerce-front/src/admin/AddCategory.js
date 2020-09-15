import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //DESTRUCTURE USER AD TOKEN FROM LOCALSTORAGE
    const { user, token } = isAuthenticated();

    const handleChange = (e) => {
        setError('');
        setName(e.target.value);
    };

    const clickSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        //MAKE REQUEST TO THE API TO CREATE CATEGORY

    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    return (
        <Layout title="Add a New Category" description={`Hey ${name}, add a new category here`}>
            <div className="row">
                <div className="col-md-8 offset-md2">
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;
