import React, { Component, Fragment } from 'react';
import StarItemList from './StarItemList';
import LikeItemList from './LikeItemList';
import StarListTemplate from './StarListTemplate'
import DayPicker from 'react-day-picker';
import logo from '../../images/logo_black.png';
import tmp_profile from '../../images/tmp_google_image.png';
import star from '../../images/star_yellow.png'
import like from '../../images/like_color.png'
import "./MyPage.css"
import 'react-day-picker/lib/style.css';

class MyPage extends Component {

    getStaredContests = async () => {
        const id = window.sessionStorage.getItem('id')
        const data = {
            id: id
        }
        const response = await fetch('api/getstared', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const body = await response.json();
        if(body[0].star.length > 0){
            this.getContests(body[0].star)
        }
        
    }

    getContests = async(id) =>{
        let contestArr = []
        for(var i=0; i<id.length; i++){
            const data = {
                id: id[i]
            }
            const response = await fetch('api/getstared/contest', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const body = await response.json();
            contestArr.push(body)
        }

        this.setState({
            staredContests : contestArr
        })

    }

    getContestsLiked = async(id) =>{
        let contestArr = []
        for(var i=0; i<id.length; i++){
            const data = {
                id: id[i]
            }
            const response = await fetch('api/getthumbsUp/contest', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const body = await response.json();
            contestArr.push(body)
        }

        this.setState({
            likedContests : contestArr
        })


    }

    getthumbsUpContests = async () => {
        const id = window.sessionStorage.getItem('id')
        const data = {
            id: id
        }
        const response = await fetch('api/getthumbsUp', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const body = await response.json();
        if(body[0].thumbsUp.length > 0){
            this.getContestsLiked(body[0].thumbsUp)
        }
    }

    constructor(props) {
        super(props);

        this.handleDayClick = this.handleDayClick.bind(this);

        this.state = {
            staredContests: [],
            likedContests: [],
            selectedDay: undefined,
            selectedContests: [],
            now: new Date(2020, 1)
        };
        this.getStaredContests().then(()=>{
            this.getthumbsUpContests()
        })

    }

    handleDayClick(day) {
        const { staredContests } = this.state;

        this.setState({ selectedDay: day });

        let filtered = [];
        const selected = new Date(day).setHours(0, 0, 0, 0);
        console.log(new Date(day))
        filtered = staredContests.filter(contest =>
            new Date(contest.startTime).setHours(0, 0, 0, 0)
            === selected);

        this.setState({ selectedContests: filtered })
    }

    render() {
        const { staredContests } = this.state;
        let modifiers = {
            colorMe: [],
        };

        for (let i in staredContests) {
            const contest = staredContests[i];
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

        return (
            <div>
                <div className="mypage-header-wrapper">
                    <img
                        className="logo-mini"
                        src={logo}
                        alt="logo" />
                    <div
                        className="contact-us">
                        Contact Us
                    </div>
                </div>

                <div className="mypage-profile">
                    <img
                        className="profile-image"
                        src={tmp_profile}
                        alt="profile image"
                        style={{ height: "5rem" }} />
                    <div className="profile-name">
                        브로콜리먹기
                    </div>
                </div>

                <div>
                    <div className="mypage-star-title">
                        <img className="mypage-star-icon"
                            src={star}
                            alt="star" />
                        <div clssName="mypage-star-text"
                            style={{ display: "inline" }}>
                            표시한 콘테스트: {this.state.staredContests.length}개
                    </div>
                    </div>

                    <div className="mypage-star-wrapper">
                        <div className="mypage-star-calendar">
                            <DayPicker
                                month={new Date(2019, 12)}
                                onDayClick={this.handleDayClick}
                                selectedDays={this.state.selectedDay}
                                modifiers={modifiers}
                                modifiersStyles={modifiersStyles} />
                        </div>
                        <div className="mypage-star-list-wrapper">
                            {
                                this.state.selectedDay ? (
                                    <div>
                                        <div className="mypage-calendar-picked-date">
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

                <div className="mypage-like-title">
                    <img className="mypage-star-icon"
                        src={like}
                        alt="like" />
                    <div clssName="mypage-star-text"
                        style={{ display: "inline" }}>
                        표시한 콘테스트: {this.state.likedContests.length}개
                    </div>
                </div>

                <div className="mypage-like-wrapper">
                    <div className="mypage-like-list-wrapper">
                        <StarListTemplate>
                            <LikeItemList
                                contests={this.state.likedContests} />
                        </StarListTemplate>
                    </div>
                </div>

            </div>
        )
    }
}
export default MyPage