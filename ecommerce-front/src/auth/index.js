import { API } from '../config';

export const signup = (user) => { 
    //console.log(name, email, password) 
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const signin = (user) => { 
    //console.log(name, email, password) 
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(err => {
        console.log(err);
    })
};

export const authenticate = (data, cb) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        cb();
    }
};

export const signout = (cb) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        cb();
        return fetch(`${API}/signout`, {
            method: 'GET'
        })
        .then(response => {
            console.log('SIGNOUT', response);
        })
        .catch(err => console.log(err));
    }
};

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false;
    }
    if(localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false;
    }
};