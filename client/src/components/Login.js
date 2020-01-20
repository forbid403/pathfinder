import React, {Component} from 'react'
import {GoogleLogin} from 'react-google-login'
const mongoose = require('mongoose')

class Login extends Component{

    constructor(props){
        super(props)
        this.state={
            id : '',
            name : '',
            provider : '',
        }
    }

    //Google Login
    responseGoogle = (res)=>{
        this.setState({
            id : res.googleId,
            name : res.w3.ig,
            provider : 'google',
        })
        this.saveSession()
    }

    //Login Fail
    responseFail = (res)=>{
        console.error(res)
    }

    //session
    saveSession = ()=>{
        const {id, name, provider} = this.state
        window.sessionStorage.setItem('id', id)
        window.sessionStorage.setItem('name', name)
        window.sessionStorage.setItem('provider', provider)
        this.props.checkLogin()
    }

    render(){
        return(<div>
            <GoogleLogin
            clientId = '622838244850-puib6rkcqqorg6fvs1lsd74tpr7jcsgn.apps.googleusercontent.com'
            buttonText = "Login"
            onSuccess ={this.responseGoogle}
            onFailure ={this.responseFail}>
            </GoogleLogin>
            
        </div>)
    }
}
export default Login