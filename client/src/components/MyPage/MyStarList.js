import React, {Component} from 'react';
import './MyStarList.css';

const MyStarList = ({children}) => {
    return (
        <section className = "star-list-wrapper">
            {children}
        </section>
    );
};

export default MyStarList;
