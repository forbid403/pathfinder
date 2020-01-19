import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { contests, onToggle } = this.props;

    const contestList = contests.map(
      ({id, image, name, date, time, checked, onToggle}) => (
        <Item
          id = {id}
          image = {image}
          name = {name}
          date = {date}
          time = {time}
          checked = {checked}
          onToggle = {onToggle}
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