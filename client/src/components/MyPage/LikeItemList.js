import React, { Component } from 'react';

class LikeItemList extends Component {
  
  dateToString(data) {
    const date = new Date(data)
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    let sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  }

  render() {
    const { contests } = this.props;

    return (
      <ul>
        {contests.map(item => {
          return (
          <li
            style = {{height: "1.7rem"}}
            key={item.title}>
            <div
                style = {{float: "left", display:"inline"}}>
                  {this.dateToString(item.startTime)}</div>
            <div
                style = {{float: "left", display:"inline"}}>　{item.site}</div>
            <div
                style = {{float: "left", display:"inline"}}
                onClick={() => { window.open(item.url) }}>　{item.title}</div>
          </li>
      );
    })}
  </ul>
    )
  }
}

export default LikeItemList;