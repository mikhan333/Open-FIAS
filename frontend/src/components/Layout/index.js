import React from 'react';
import classes from './index.module.css';
import Header from '../Header'

const layout = ({ children }) => (
    <div className={ classes.Layout }>
        <div className={ classes.Header }><Header/></div>
        <main className={ classes.Content }>
            { children }
        </main>
    </div>
);

export default layout;




