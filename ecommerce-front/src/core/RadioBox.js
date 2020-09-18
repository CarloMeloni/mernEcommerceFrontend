import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices }) => {
    const [ value, setValue ] = useState(0);

    const handleChange = () => {
        
    };

        return prices.map((price, idx) => (
            <div key={idx} >
                <input onChange={handleChange} value={`${price._id}`} type="radio" className="mr-2 ml-4" />
                <label className="form-check-label">{price.name}</label>
            </div>
        ))
}

export default RadioBox;
