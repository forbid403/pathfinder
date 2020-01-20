import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import MyPage from './components/MyPage/MyPage'
import Home from './Home'

const App = () => {

  return (
    <Router>
      <div>
        <switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/mypage" component={MyPage}></Route>

        </switch>

      </div>
    </Router>
  )

}
export default App