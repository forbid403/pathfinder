import React, { Component } from 'react'

class App extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    this.callApi()
      .then(res => {
        console.log(res)
        this.setState({ data: res })
      })
      .catch(err => console.log(err))
  }

  callApi = async () => {
    const response = await fetch('api/getcontestdata');
    const body = await response.json();
    //console.log(body)
    return body;
  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <div>HELLO</div>
        <ul>
        {data.map(item => {
          return <li>{item[0]}</li>;
        })}
        </ul>
      </div>

    )
  }
}

export default App