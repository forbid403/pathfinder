import React, { Component } from 'react';
import './StarItem.css';

class StarItem extends Component {
  constructor(props){
    super(props)
  }

dateToString(date)
{
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    if( month < 10 ) month = '0' + month;
    
    let day = date.getDate();
    if( day < 10 ) day = '0' + day;

    let hour = date.getHours();
    if( hour < 10 ) hour = '0' + hour;

    let min = date.getMinutes();
    if( min < 10 ) min = '0' + min;

    let sec = date.getSeconds();
    if( sec < 10 ) sec = '0' + sec;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

  render() {
    const { title, site, url } = this.props;

    const tmp_koreanTime = new Date(startTime.slice(0, -1));
    const koreanTime = this.dateToString(tmp_koreanTime);

    return (
      <div className="star-contest-item"
           onClick={() => {window.open(url)}}>
          <div className = "star-contest-site">{site}　|　</div>
          <div className = "star-contest-title">{title}</div>
      </div>
    );
  }
}

export default StarItem;