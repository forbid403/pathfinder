import React, {Component} from 'react'
import Login from '../Login'
import {Link, useHistory} from 'react-router-dom'
import {GoogleLogout} from 'react-google-login'

class Header extends Component {
    
    checkLogin = ()=>{
        this.props.onLogin()
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
            <div>
            {isLogin ?
                <div>
                    <Link to="/mypage">TO MYPAGE</Link>
                    <GoogleLogout
                    clientId = '622838244850-puib6rkcqqorg6fvs1lsd74tpr7jcsgn.apps.googleusercontent.com'
                    buttonText = "LogOut"
                    onLogoutSuccess={this.onLogoutSuccess}
                    onFailure={this.onFailure}></GoogleLogout>
                </div>
                :
                <div>
                    <Login checkLogin={this.checkLogin}/>
                </div>
            }
            </div>
            
        )
    }
}

export default Header