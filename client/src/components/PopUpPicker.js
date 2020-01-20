import React, { Component } from 'react';
import { format, addDays } from 'date-fns';
import './PopUpPicker.css';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

class PopUpPicker extends Component {

	constructor(props) {
		super(props)

		this.state = {
			dateRangePicker: {
			  selection: {
				startDate: new Date(),
				endDate: null,
				key: 'selection',
			  },
			}
		}
	}

	formatDateDisplay(date, defaultText) {
		if (!date) return defaultText;
		return format(date, 'YYYY-MM-DD');
	}

	handleRangeChange(which, payload) {
		console.log(which, payload);
		this.setState({
		  [which]: {
			...this.state[which],
			...payload,
		  },
		});
	}

	render(){
		const {formatDateDisplay} = this;
		
		return (
			<div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              ranges={[this.state.dateRangePicker.selection]}
            />
		  </div>
		)
	}
}

export default PopUpPicker