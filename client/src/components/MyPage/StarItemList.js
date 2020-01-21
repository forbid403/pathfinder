import React, { Component } from 'react';

class StarItemList extends Component {
  
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
                style = {{float: "left", display:"inline"}}>{item.site}</div>
            <div
                style = {{display:"inline"}}
                onClick={() => { window.open(item.url) }}>{item.title}</div>
          </li>
      );
    })}
  </ul>
    )
  }
}

export default StarItemList;