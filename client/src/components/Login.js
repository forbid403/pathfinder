import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login'
import { useHistory } from 'react-router-dom'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }

    callApi = async () => {
        const data = {
            id: this.state.id,
            name: this.state.name,
            provider: this.state.provider
        }
        const response = await fetch('api/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const body = await response.json();
        return body
    }

    //Google Login
    responseGoogle = (res) => {
        this.setState({
            id: res.googleId,
            name: res.w3.ig,
            provider: 'google',
        })
        
        this.callApi()
        .then(() => this.saveSession())
        .then(()=>window.location.reload())
    }

    //Login Fail
    responseFail = (res) => {
        console.error(res)
    }

    //session
    saveSession = () => {
        const { id, name, provider } = this.state
        window.sessionStorage.setItem('id', id)
        window.sessionStorage.setItem('name', name)
        window.sessionStorage.setItem('provider', provider)
        this.props.checkLogin()
    }

    render() {
        return (<div>

            <GoogleLogin
                type="submit"
                clientId='622838244850-puib6rkcqqorg6fvs1lsd74tpr7jcsgn.apps.googleusercontent.com'
                buttonText="Login"
                onSuccess={this.responseGoogle}
                onFailure={this.responseFail}>
            </GoogleLogin>

        </div>)
    }
}
export default Login