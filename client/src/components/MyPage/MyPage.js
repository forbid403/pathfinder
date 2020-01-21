import React, {Component, Fragment} from 'react';
import MyStarList from './MyStarList';
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

        this.state = {
            currentContests: []
        }
    }

    callApi = async () => {
        const response = await fetch('api/getcontestdata');
        const body = await response.json();
        return body;
    }

    componentWillMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    currentContests: res
                })
            })
            .catch(err => console.log(err))
    }


    StylingInline() {
        const modifiers = {
            thursdays: { daysOfWeek: [4] },
            birthday: new Date(2018, 9, 30),
          };
          const modifiersStyles = {
            birthday: {
              color: 'white',
              backgroundColor: '#ffc107',
            },
            thursdays: {
              color: '#ffc107',
              backgroundColor: '#fffdee',
            },
          };    
    }
    
    render(){
        const {modifiers, modifiersStyles} = this;
        const {currentContests} = this.state;
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
                    표시한 콘테스트: n개
                    </div>
                    <div className = "mypage-star-alarm"
                         style = {{display: "inline", float: "right"}}>
                    알림 받기　
                    </div>
                </div>

                <div className = "mypage-star-wrapper">
                    <div className = "mypage-star-calendar">
                        <DayPicker
                            month={new Date()}
                            modifiers={modifiers}
                            modifiersStyles={modifiersStyles}/>
                    </div>
                    <div className = "mypage-star-list-wrapper">
                        <MyStarList>
                        </MyStarList>
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
                        <MyStarList>
                        </MyStarList>
                    </div>
                </div>
            
            </div>
        )
    }
}
export default MyPage