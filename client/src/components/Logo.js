import React, { Component } from 'react';
import logo from '../images/new_logo.png';
import './Logo.css'

class Logo extends Component{
    render()
    {
        return <img src = {logo} alt = "logo"
        className = "logo"/>;
    }
}

export default Logo;