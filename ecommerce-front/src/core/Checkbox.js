import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
    const [ checked, setChecked ] = useState([]);

    const handleToggle = categ => () => {
        const currentCategoryId = checked.indexOf(categ);
        const newCheckedCategoryId = [...checked];

        if(currentCategoryId === -1) {
            newCheckedCategoryId.push(categ);
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }

        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId, )
    };

     return categories.map((categ, idx) => (
        <li key={idx} className="list-unstiled">
            <input onChange={handleToggle(categ._id)} value={checked.indexOf(categ._id === -1)} type="checkbox" className="form-check-input" />
            <label className="form-check-label">{categ.name}</label>
        </li>
    ))
}

export default Checkbox;
