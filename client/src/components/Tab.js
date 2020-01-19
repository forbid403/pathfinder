import React, { Component } from 'react';
import TabButton from './TabButton';
import './Tab.css'

class Tab extends Component {
    
    render() {
        const { categories, callbackFromParent } = this.props;
        
        const categoryList = categories.map(
            ({id, name}) => (
                <TabButton
                    id = {id}
                    name = {name}
                    callbackFromParent = {callbackFromParent}
                    key = {id}
                />
            )
        );

        return(
            <div className = "tabs">
              {categoryList}
            </div>
        );
    };
}

export default Tab;