import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
import { Link } from 'react-router-dom';
import MyPage from './MyPage/MyPage'
class Login extends Component{

    constructor(props){
        super(props)
        this.state={
            id : '',
            name : '',
            provider : '',
            logged : this.props.logged
        }
    }

    //Google Login
    responseGoogle = (res)=>{
        this.setState({
            id : res.googleId,
            name : res.w3.ig,
            provider : 'google',
            logged : true
        })
    }

    //Login Fail
    responseFail = (res)=>{
        console.error(res)
    }

    render(){
        const { name, logged } = this.state
        return(<div>
            {logged === true ?
            <div>
                Hello! {name}
                <Link to="/mypage">mypage</Link>
            </div>
            :
            <GoogleLogin
            clientId = '622838244850-puib6rkcqqorg6fvs1lsd74tpr7jcsgn.apps.googleusercontent.com'
            buttonText = "Login"
            onSuccess ={this.responseGoogle}
            onFailure ={this.responseFail}>
            </GoogleLogin>
            }
            
            
        </div>)
    }
}
export default Login