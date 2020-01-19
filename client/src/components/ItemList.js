import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { contests, noticeWhenDone } = this.props;

    const contestList = contests.map(
      ({id, image, name, date, time, url, num, checked}) => (
        <Item
          id = {id}
          image = {image}
          name = {name}
          date = {date}
          time = {time}
          url = {url}
          num = {num}
          noticeWhenDone = {noticeWhenDone}
          checked = {checked}
          key = {id}
        />
      )
    );

    return (
      <div>
        {contestList}       
      </div>
    );
  }
}

export default ItemList;