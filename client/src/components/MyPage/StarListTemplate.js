import React from 'react';
import './StarListTemplate.css';

const StarListTemplate = ({children}) => {
    return (
        <main className = "star-list-template">
            <section className = "star-contests-wrapper">
                {children}
            </section>
        </main>
    );
};

export default StarListTemplate;
