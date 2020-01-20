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

    handlingChange()
    {
        console.log("@@HANDLING")
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
                    <input
                        className = "search-by-text"
                        value={this.state.keyword}
                        name={'keyword'}
                        onChange={this.handlingChange}>
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