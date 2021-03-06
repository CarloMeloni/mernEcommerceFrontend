import React, { Fragment } from 'react';
import Menu from './Menu';
import '../style.css';

const Layout = ({ title = "Title", description = "Description", className, children }) => {
    return (
        <Fragment>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </Fragment>
    )
}

export default Layout;
