import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { contests } = this.props;

    const contestList = contests.map(
      ({id, image, name, date, time, url, checked, onToggle}) => (
        <Item
          id = {id}
          image = {image}
          name = {name}
          date = {date}
          time = {time}
          url = {url}
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