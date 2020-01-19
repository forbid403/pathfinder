import React from 'react';
import './ListTemplate.css';

const ListTemplate = ({form, children}) => {
    return (
        <main className = "list-template">
            <section className = "contests-wrapper">
                {children}
            </section>
        </main>
    );
};

export default ListTemplate;
