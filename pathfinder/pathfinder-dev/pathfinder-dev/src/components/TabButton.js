import React, { Component } from 'react';
import './TabButton.css'

class TabButton extends Component {

    constructor(props){
        super(props)
    
        const { id, name } = this.props;
        this.state = {
          id: {id},
          name: {name},
          toggled: false
        }
    }

    render() {
        const { id, name, callbackFromParent } = this.props;

        return (
            <button className = "button"
            onClick={() => {
                this.setState({toggled: true});
                callbackFromParent(id);
            }}>{name}</button>)
    }
}

export default TabButton