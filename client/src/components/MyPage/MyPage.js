import React, {Component, Fragment} from 'react';
import StarItemList from './StarItemList';
import StarListTemplate from './StarListTemplate'
import DayPicker from 'react-day-picker';
import logo from '../../images/logo_black.png';
import tmp_profile from '../../images/tmp_google_image.png';
import star from '../../images/star_yellow.png'
import like from '../../images/like_color.png'
import "./MyPage.css"
import 'react-day-picker/lib/style.css';

class MyPage extends Component{
    constructor(props) {
        super(props);

        this.handleDayClick = this.handleDayClick.bind(this);

        this.state = {
            likedContests: [
                {site:"Atcoder", title:"Go To Google", startTime:new Date("2020-01-12 12:00:00"), duration:"2.0", url:"http://www.google.com"},
                {site:"Atcoder", title:"Wow But I'm Okay Naver", startTime:new Date("2020-01-15 12:00:00"), duration:"2.0", url:"http://www.naver.com"},
                {site:"Topcoder", title:"Pan Pineapple Pinapple Pan Daum", startTime:new Date("2020-01-20 12:00:00"), duration:"2.0", url:"http://www.daum.net"},
                {site:"Leetcode", title:"Junior Contest 2020 Jan", startTime:new Date("2020-01-31 12:00:00"), duration:"2.0", url:"http://www.google.com"},
                {site:"Leetcode", title:"Weekly 124 Contest", startTime:new Date("2020-01-30 12:00:00"), duration:"2.0", url:"http://www.google.com"},
                {site:"Atcoder", title:"I Love Algorithm", startTime:new Date("2020-01-25 13:00:00"), duration:"2.0", url:"http://www.google.com"},
                {site:"Topcoder", title:"But I Love Chicken More", startTime:new Date("2020-01-10 12:00:00"), duration:"2.0", url:"http://www.google.com"},
            ],
            selectedDay: undefined,
            selectedContests: [],
            now: new Date(2020, 1)
        };
    }

    handleDayClick(day) {
        const {likedContests} = this.state;

        this.setState({selectedDay : day});
        
        let filtered = [];
        const selected = new Date(day).setHours(0, 0, 0, 0);
        console.log(new Date(day))
        filtered = likedContests.filter(contest =>
            new Date(contest.startTime).setHours(0, 0, 0, 0)   
               === selected);
               
        this.setState({selectedContests : filtered})
    }

    render(){
        const {likedContests} = this.state;
        let modifiers = {
            colorMe: [],
        };
        
        for (let i in likedContests)
        {
            const contest = likedContests[i];
            const date = new Date(contest.startTime);
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();

            const insertMe = new Date(year, month, day);
            modifiers.colorMe.push(insertMe);
        }

        const modifiersStyles = {
            colorMe: {
                color: 'white',
                backgroundColor: '#ffc107',
            },
        };

        return(
            <div>
                <div className = "mypage-header-wrapper">
                    <img
                        className = "logo-mini"
                        src = {logo}
                        alt = "logo"/>
                    <div
                        className = "contact-us">
                        Contact Us
                    </div>
                </div>

                <div className = "mypage-profile">
                    <img
                        className = "profile-image"
                        src = {tmp_profile}
                        alt = "profile image"
                        style = {{height: "5rem"}}/>
                    <div className = "profile-name">
                        브로콜리먹기
                    </div>
                </div>

            <div>
            <div className = "mypage-star-title">
                    <img className = "mypage-star-icon"
                        src = {star}
                        alt = "star"/>
                    <div clssName = "mypage-star-text"
                         style = {{display: "inline"}}>
                    표시한 콘테스트: {this.state.likedContests.length}개
                    </div>
                    <div className = "mypage-star-alarm"
                         style = {{display: "inline", float: "right"}}>
                    알림 받기　
                    </div>
                </div>

                <div className = "mypage-star-wrapper">
                    <div className = "mypage-star-calendar">
                        <DayPicker
                            month={new Date(2019, 12)}
                            onDayClick={this.handleDayClick}
                            selectedDays={this.state.selectedDay}
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}/>
                    </div>
                    <div className = "mypage-star-list-wrapper">
                        {
                            this.state.selectedDay ? (  
                                <div>    
                                <div className = "mypage-calendar-picked-date">
                                    {this.state.selectedDay.toLocaleDateString()}
                                </div>
                                <StarListTemplate>
                                    <StarItemList
                                        contests={this.state.selectedContests} />
                                </StarListTemplate>
                                </div>
                            ) : <div>날짜를 선택하세요.</div>
                        }
                    </div>
                </div>
            </div>
            
            <div className = "mypage-like-title">
                    <img className = "mypage-star-icon"
                        src = {like}
                        alt = "like"/>
                    <div clssName = "mypage-star-text"
                         style = {{display: "inline"}}>
                    표시한 콘테스트: n개
                    </div>
                </div>

                <div className = "mypage-like-wrapper">
                    <div className = "mypage-like-list-wrapper">
                    </div>
                </div>
            
            </div>
        )
    }
}
export default MyPage