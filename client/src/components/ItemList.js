import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { contests, onToggle } = this.props;
    const contestList = contests.map(
      ({ _id, site, title, duration, startTime, checked, onToggle }) => (
        <Item
          _id = {_id}
          site={site}
          title={title}
          duration={duration}
          startTime={startTime}
          checked={checked}
          onToggle={onToggle}
          key={_id}
        />
      )
    );
    console.log(contestList)

    return (
      <div>
        {contestList}
      </div>
    );
  }
}

export default ItemList;