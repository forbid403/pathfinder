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
    
    if (this.props.image === 0) { this.setState({source: leet}) }
    else if (this.props.image === 1) { this.setState({source: top}) }
    else { this.setState({source: at}) }

    //time format: "2020.01.18 13:30"
    /*
    let parseMe = this.props.date
    let year = parseMe.substring(0, 4)
    let month = parseMe.substring(5, 7)
    let day = parseMe.substring(8, 10)
    let hour = parseMe.substring(11, 13)
    let minute = parseMe.substring(14, 16)
    
    let dateString = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":00"
    let setMe = new Date(dateString)
    this.setState({timeUntil: setMe})*/
    let setMe = new Date(this.props.date)
    this.setState({timeUntil: setMe})
  }
  
  componentDidMount() {
    this.textInterval = setInterval(() => {
      let startDate = new Date().getTime()
      const endDate = this.state.timeUntil.getTime()
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

        if (remains >= (this.props.time * (-1) * 1000 * 60 * 60)) //in progress!
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

  toggled(url) {
    console.log(url);
  }

  render() {
    const { name, date, time, id, url } = this.props;

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
          <div>{name}</div>
          <div className = "contest-date">{date}　</div>
          <div className = "contest-timer-bar">{this.state.timerBar}</div>
          <div className = "contest-timer">　{this.state.timer}</div>
        </div>
        
        <div className = "contest-time"
        style = {
          {color: this.state.foregroundColor, backgroundImage: this.state.backgroundImage}}>{time}h</div>
        {
          false && (<div className="check-mark">✓</div>)
        }
      </div>
    );
  }
}

export default Item;