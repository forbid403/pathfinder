import React, { Component } from 'react';
import logo from '../images/logo_black.png';
import './Logo.css'

class Logo extends Component{

    render()
    {
        return <img src = {logo}
        height = "150rem"
        className = "center"/>;
    }
}

export default Logo;