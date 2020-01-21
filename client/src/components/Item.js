import React, { Component } from 'react';
import './Item.css';
import leet from "../images/LeetCode_name.png";
import top from "../images/TopCoder_name.png";
import at from "../images/AtCoder_name.png";
import leet_gray from "../images/LeetCode_Gray.png";
import top_gray from "../images/TopCoder_Gray.png";
import at_gray from "../images/AtCoder_Gray.png";
import like_default from '../images/like_default.png';
import like_color from '../images/like_color.png';
import star_default from '../images/star_default.png';
import star_color from '../images/star_yellow.png';

class Item extends Component {

  checkThumbsup = async () => {
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/thumbsup/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if(body.ret){
        this.setState({
          isThumbsup : true
        })
      }
    }
  }

  addThumbsUp = async () =>{
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/thumbsup/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if(body.ret){
        this.setState({
          isThumbsup : true
        })
      }
    }
  }

  cancleThumbsUp = async () =>{
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/thumbsup/cancle', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if(body.ret){
        this.setState({
          isThumbsup : false
        })
      }
    }
  }

  checkStar = async () => {
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/star/', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();
      if(body.ret){
        this.setState({
          isStar : true
        })
      }
    }
  }

  addStar = async () =>{
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/star/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if(body.ret){
        this.setState({
          isStar : true
        })
      }
    }
  }

  cancleStar = async()=>{
    const id = window.sessionStorage.getItem('id')
    if (id) {
      const data = {
        id: id,
        contestId: this.props._id
      }
      const response = await fetch('api/star/cancle', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const body = await response.json();

      if(body.ret){
        this.setState({
          isStar : false
        })
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      source: null,
      timeUntil: 0,
      timer: null,
      timerBar: "|",
      backgroundImage: "url('images/hourBackground_blue_gray.png')",
      backgroundColor: "#ffffff",
      foregroundColor: "#000000",
      done: false,
      isThumbsup: false,
      isStar : false
    }
    this.checkStar()
    this.checkThumbsup()
  }

  componentDidMount() {
    //select image!
    if (this.props.site === "Leetcode") { this.setState({ source: leet }) }
    else if (this.props.site === "Topcoder") { this.setState({ source: top }) }
    else { this.setState({ source: at }) }

    let setMe = this.props.startTime
    this.setState({ timeUntil: setMe })

    this.textInterval = setInterval(() => {
      let startDate = new Date().getTime()
      const endDate = new Date(this.state.timeUntil.slice(0, -1))
      let remains = endDate - startDate

      let days = Math.floor((remains % (1000 * 60 * 60 * 24 * 60 * 60 * 24)) / (1000 * 60 * 60 * 24))
      let hours = Math.floor((remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      let minutes = Math.floor((remains % (1000 * 60 * 60)) / (1000 * 60))
      let seconds = Math.floor((remains % (1000 * 60)) / 1000)


      let showMe = days + "d " + hours + "h " + minutes + "m " + seconds + "s"
      this.setState({ timer: showMe })

      if (remains < 0) //when timer should be expired
      {
        this.setState({ timer: null })
        this.setState({ timerBar: null })

        if (remains >= (parseFloat(this.props.duration) * (-1) * 1000 * 60 * 60)) //in progress!
        {
          this.setState({ backgroundColor: "#e4f5e6" })
          this.setState({ backgroundImage: "url('images/hourBackground_blue.png')" })

          //notice to 'App.js' so that it can change the order of the full list.
          this.props.noticeWhenChanged(0, this.props._id, this.props.num);
        }
        else//done!
        {
          this.setState({ done: true })
          this.setState({ backgroundColor: "#e9ecef" })
          this.setState({ foregroundColor: "#868e96" })
          this.setState({ backgroundImage: "url('images/hourBackground.png')" })

          if (this.props.site === "Leetcode") { this.setState({ source: leet_gray }) }
          else if (this.props.site === "Topcoder") { this.setState({ source: top_gray }) }
          else { this.setState({ source: at_gray }) }

          //notice to 'App.js' so that it can change the order of the full list.
          this.props.noticeWhenChanged(1, this.props._id, this.props.num);
          clearInterval(this.textInterval);
        }
      }
      else {
        remains = remains - 1000; // minus 1 sec.
      }
    }, 1000);

    if (this.state.done === true) clearInterval(this.textInterval)

  }

  handleThumbsupClick = () => {
    this.state.isThumbsup ?
      //cancle thumbsup
      this.cancleThumbsUp()
      :
      //add thumbsup
      this.addThumbsUp()
  }
  handleStarClick = () => {
    this.state.isStar ?
      //cancle thumbsup
      this.cancleStar()
      :
      //add thumbsup
      this.addStar()
  }
  
  dateToString(date) {
    const year = date.getFullYear();

    let month = date.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let day = date.getDate();
    if (day < 10) day = '0' + day;

    let hour = date.getHours();
    if (hour < 10) hour = '0' + hour;

    let min = date.getMinutes();
    if (min < 10) min = '0' + min;

    let sec = date.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
  }

  render() {
    const { image, title, duration, startTime, checked, url, _id, onToggle } = this.props;
    const { isThumbsup, isStar, backgroundImage, foregroundColor } = this.state
    const tmp_koreanTime = new Date(startTime.slice(0, -1));
    const koreanTime = this.dateToString(tmp_koreanTime);

    return (
      <div className="contest-item"
        style={{ background: this.state.backgroundColor }}>

        <div className="web-image">
          <img src={this.state.source} /*{source}*/
            width="80rem"
            className="center" />
        </div>

        <div className="contest-name"
              style={{ color: this.state.foregroundColor }}>
          <div
              onClick={() => { window.open(url) }}>{title}</div>
          <div className="contest-date">{koreanTime}　</div>
          <div className="contest-timer-bar">{this.state.timerBar}</div>
          <div className="contest-timer">　{this.state.timer}</div>
        </div>

      <div className = "contest-icons-wrapper">
        <div className="contest-time"
            style={
              { color: foregroundColor, backgroundImage: backgroundImage }}>
            {duration}h
          </div>

          <div className="contest-star">
            <img className="contest-star-img"
              src={isStar ? star_color : star_default}
              alt="star"
              onClick={this.handleStarClick}
            ></img>
          </div>

          <div className="contest-like">
            <img className="contest-like-img"
              src={isThumbsup ? like_color : like_default}
              alt="like"
              onClick={this.handleThumbsupClick}
            ></img>
          </div>
      </div>
        
      </div>
    );
  }
}

export default Item;