import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MyPage from './MyPage/MyPage'
import App from './App'

const Route = () =>{

    return(
        <Router>
            <Login logged={isLogin} />
            <div>
                <Route path="/" component={App}></Route>
                <Route path="/mypage" component={MyPage}></Route>

            </div>
        </Router>
    )

}
export default Route