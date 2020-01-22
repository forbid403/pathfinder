import React, {Component} from 'react'
import Login from '../Login'
import {Link} from 'react-router-dom'
import {GoogleLogout, /*GoogleAuth*/} from 'react-google-login'
import './Header.css'

class Header extends Component {

    constructor(props)
    {
        super(props)

        this.state = {
            profileImgSrc: ''
        }
    }
    
    checkLogin = ()=>{
        this.props.onLogin()
        //console.log(GoogleAuth.currentUser.get().getBasicProfile())
    }

    onLogoutSuccess = ()=>{
        this.props.onLogOut()
        window.location.reload()
    }
    onFailure = (res)=>{
        console.error(res)
    }

    render(){
        const {isLogin} = this.props
        return(
            <div
                className = "header-wrapper">
            {isLogin ?
                <div>
                    <Link
                        className = "header-mypage"
                        to="/mypage">마이페이지</Link>
                    <GoogleLogout
                        className = "header-logout"
                        clientId = '622838244850-puib6rkcqqorg6fvs1lsd74tpr7jcsgn.apps.googleusercontent.com'
                        buttonText = "로그아웃"
                        onLogoutSuccess={this.onLogoutSuccess}
                        onFailure={this.onFailure}>
                    </GoogleLogout>
                </div>
                :
                <div>
                    <Login
                        className = "header-login"
                        checkLogin={this.checkLogin}>
                    </Login>
                </div>
            }
            </div>
            
        )
    }
}

export default Header