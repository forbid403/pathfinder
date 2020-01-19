import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  render() {
    const { contests, noticeWhenDone } = this.props;
    const contestList = contests.map(
      ({ _id, site, title, duration, startTime, num, checked, url, onToggle }) => (
        <Item
          _id = {_id}
          site={site}
          title={title}
          duration={duration}
          startTime={startTime}
          checked={checked}
          num = {num}
          noticeWhenDone = {noticeWhenDone}
          onToggle={onToggle}
          url = {url}
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