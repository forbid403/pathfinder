import React, { Component } from 'react';

class MyPageLikeItem extends Component {

    render()
    {
        const { image, title, duration, startTime, checked, url, _id, onToggle } = this.props;
        const tmp_koreanTime = new Date(startTime.slice(0, -1));
        const koreanTime = this.dateToString(tmp_koreanTime);
    
        return (
          <div className="contest-item"
               style={{background: this.state.backgroundColor}}
               onClick={() => {window.open(url)}}>
            
            <div className = "web-image">
              <img src = {this.state.source} /*{source}*/
              width = "80rem"
              className = "center"/>
            </div>
    
            <div className = "contest-name" style = {{color: this.state.foregroundColor}}>
              <div>{title}</div>
              <div className = "contest-date">{koreanTime}　</div>
              <div className = "contest-timer-bar">{this.state.timerBar}</div>
              <div className = "contest-timer">　{this.state.timer}</div>
            </div>
            
            <div className = "contest-time"
            style = {
              {color: this.state.foregroundColor, backgroundImage: this.state.backgroundImage}}>
                {duration}h
            </div>
          </div>
        );
    
    }
    
}
*/
