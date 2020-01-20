import React, { Component, Fragment } from 'react';
import './SearchBar.css';
import searchIcon from '../images/search.png';
import dateIcon from '../images/calendar.png';

class SearchBar extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            keyword: ""
        };
    }

    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
        console.log("@@@ INPUT: " + e);
    }

    render()
    {
        return (
            <div className = "bar">
                <div className = "search-bar">
                    <img
                        className = "search-icon"
                        src = {searchIcon}
                        alt = "search"
                    />
                    <input type = "text"
                        className = "search-by-text"
                        value={this.state.keyword}
                        name={'keyword'}
                        onChange={this.handleChange}>
                    </input>
                </div>

                <img
                className = "date-icon"
                src = {dateIcon}
                alt = "searchByDate"
                />
            </div>
        )
    }
}

export default SearchBar;