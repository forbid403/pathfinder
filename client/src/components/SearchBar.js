import React, { Component, Fragment } from 'react';
import './SearchBar.css';
import searchIcon from '../images/search-title.png';
import dateIcon from '../images/calendar.png';
import PopUpPicker from './PopUpPicker';

class SearchBar extends Component{

    constructor(props)
    {
        super(props);

        this.state = {
            keyword: "",
            showCalendar: false,
            clicked: false
        };
    }

    handleSearchTextChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        }) //Stored current input successfully!

        this.props.showSearchResult(e);
    }

    calendarClicked() {
        this.setState({showCalendar: true});
    }
    
    render()
    {
        return (
        <Fragment>
            <div className = "bar">
                <div className = "search-bar">
                    <img
                        className = "search-title"
                        src = {searchIcon}
                        alt = "search"
                    />
                    <input type = "text"
                        className = "search-by-text"
                        value={this.state.keyword}
                        name={'keyword'}
                        onChange={this.handleSearchTextChange}>
                    </input>
                </div>

                <img
                    className = "date-icon"
                    src = {dateIcon}
                    alt = "searchByDate"
                    onClick = {() => {
                        if (!this.state.clicked)
                            this.setState({
                                showCalendar : true,
                                clicked : true})
                        else
                            this.setState({
                                showCalendar : false,
                                clicked : false
                            })
                    }}
                />
            </div>

            {
                this.state.showCalendar?
                <div
                    className = "range-wrapper">
                    <PopUpPicker
                        className = "range-picker"
                    ></PopUpPicker>
                </div>
                : null
            }

        </Fragment>
        )
    }
}

export default SearchBar;