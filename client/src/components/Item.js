import React, { Component } from 'react';
import './Item.css';
import leet from "../images/LeetCode_name.png"
import top from "../images/TopCoder_name.png"
import at from "../images/AtCoder_name.png"
import leet_gray from "../images/LeetCode_Gray.png"
import top_gray from "../images/TopCoder_Gray.png"
import at_gray from "../images/AtCoder_Gray.png"

class Item extends Component {
  constructor(props){
    super(props)

    this.state = {
      source: null,
      timeUntil: 0,
      timer: null,
      timerBar: "|",
      backgroundImage: "url('images/hourBackground_blue_gray.png')",
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
    }
  }

  componentWillMount(){
    //select image!
    
    if (this.props.site === "Leetcode") { this.setState({source: leet}) }
    else if (this.props.site === "Topcoder") { this.setState({source: top}) }
    else { this.setState({source: at}) }

    let setMe = this.props.startTime
    this.setState({timeUntil: setMe})
  }
  
  componentDidMount() {
    this.textInterval = setInterval(() => {
      let startDate = new Date().getTime()
      const endDate = new Date(this.state.timeUntil)
      let remains = endDate - startDate

      let days = Math.floor((remains % (1000 * 60 * 60 * 24 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24))
      let hours = Math.floor((remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((remains % (1000 * 60)) / 1000)
      
  
      let showMe = days + "d " + hours + "h " + minutes + "m " + seconds + "s"
      this.setState({timer: showMe})
    
      if (remains < 0) //when timer should be expired
      {
        this.setState({timer: null})
        this.setState({timerBar: null})

        if (remains >= (parseFloat(this.props.duration) * (-1) * 1000 * 60 * 60)) //in progress!
        {
          this.setState({backgroundColor: "#e4f5e6"})
          this.setState({backgroundImage: "url('images/hourBackground_blue.png')"})
        }
        else //done!
        {
          this.setState({backgroundColor: "#e9ecef"})
          this.setState({foregroundColor: "#868e96"})
          this.setState({backgroundImage: "url('images/hourBackground.png')"})

          if (this.props.image === 0) { this.setState({source: leet_gray}) }
          else if (this.props.image === 1) { this.setState({source: top_gray}) }
          else { this.setState({source: at_gray}) }
        }
      }
      else
      {
        remains = remains - 1000; // minus 1 sec.
      }}, 1000);
}

  render() {
    const { image, title, duration, startTime, checked, id, onToggle } = this.props;

    return (
      <div className="contest-item"
           style={{background: this.state.backgroundColor}}
           onClick={() => onToggle(id)}>
        
        <div className = "web-image">
          <img src = {this.state.source} /*{source}*/
          width = "80rem"
          className = "center"/>
        </div>

        <div className = "contest-name" style = {{color: this.state.foregroundColor}}>
          <div>{title}</div>
          <div className = "contest-date">{startTime}　</div>
          <div className = "contest-timer-bar">{this.state.timerBar}</div>
          <div className = "contest-timer">　{this.state.timer}</div>
        </div>
        
        <div className = "contest-time"
        style = {
          {color: this.state.foregroundColor, backgroundImage: this.state.backgroundImage}}>{duration}h</div>
        {
          false && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default Item;