import React, { Component, Fragment } from 'react';
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './PopUpPicker.css';
import searchIcon from '../images/search.png';
import againIcon from '../images/again.png';


export default class PopUpPicker extends React.Component {
  static defaultProps = {
    numberOfMonths: 3,
  };

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      from: undefined,
      to: undefined,
    };
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
	this.setState(this.getInitialState());
  }
  
  handleSearchClick = () => {
	  this.props.showDateRangeSearchResult(this.state.from, this.state.to);
}

  render() {
	
    const { from, to } = this.state;
	const modifiers = { start: from, end: to };
	
	
    return (
      <div className="RangeExample">
        <p>
          {!from && !to && '언제부터 볼까요?'}
          {from && !to && '언제까지 볼까요?'}
          {from &&
            to &&
            `${from.toLocaleDateString()} - 
                ${to.toLocaleDateString()}`}{' '}
          {from && to && (
			<Fragment>
			<img
				className="search-icon"
				src = {searchIcon}
				alt = "search"
				onClick={this.handleSearchClick}
            />
            <img
				className="again-icon"
				src = {againIcon}
				alt = "again"
				onClick={this.handleResetClick}
            />
			</Fragment>
          )}
        </p>
        <DayPicker
          className="Selectable"
          numberOfMonths={this.props.numberOfMonths}
          selectedDays={[from, { from, to }]}
          modifiers={modifiers}
          onDayClick={this.handleDayClick}
        />
        <Helmet>
          <style>{`
  .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #f0f8ff !important;
    color: #4a90e2;
  }
  .Selectable .DayPicker-Day {
    border-radius: 0 !important;
  }
  .Selectable .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
  }
  .Selectable .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
  }
`}</style>
        </Helmet>
      </div>
    );
  }
}