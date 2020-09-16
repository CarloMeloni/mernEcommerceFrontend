import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth/index';
import {  createCategory } from './apiAdmin';

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
        createCategory( user._id, token, {name} )
            .then(data => {
                if(data.error) {
                    setError(data.error);
                } else {
                    setError('');
                    setSuccess(true);
                }
            })
    };

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    const showSuccess = () => {
        if(success) {
            return (<h3 className="text-success">{name} is Created</h3>);
        }
    };

    const showError = () => {
        if(error) {
            return (<h3 className="text-danger">{' '}Category should be unique</h3>);
        }
    };
    
    const goBack = () => (
        <div className="mt-5"><Link to="/admin/dashboard" className="text-warning">Back To Dashboard</Link></div>
    );

    return (
        <Layout title="Add a New Category" description={`Hey ${user.name}, add a new category here`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory;
