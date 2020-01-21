import React, { Component } from 'react';
import Item from './Item';

class ItemList extends Component {
  
  render() {
    const { contests, noticeWhenChanged } = this.props;
    const contestList = contests.map(
      ({ _id, site, title, duration, startTime, num, checked, url, onToggle }) => (
        <Item
          _id={_id}
          site={site}
          title={title}
          duration={duration}
          startTime={startTime}
          checked={checked}
          num={num}
          noticeWhenChanged={noticeWhenChanged}
          onToggle={onToggle}
          url={url}
          key={_id}
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