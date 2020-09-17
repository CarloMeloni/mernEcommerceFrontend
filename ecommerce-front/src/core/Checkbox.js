import React, { useState, useEffect } from 'react'

const Checkbox = ({ categories }) => {
    return categories.map((categ, idx) => (
        <li key={idx} className="list-unstiled">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label">{categ.name}</label>
        </li>
    ))
}

export default Checkbox
