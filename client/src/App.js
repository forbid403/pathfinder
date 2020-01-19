import React, { Component, Fragment } from 'react';
import ListTemplate from './components/ListTemplate';
import ItemList from './components/ItemList';
import Logo from './components/Logo'
import Tab from './components/Tab'


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      contests: [],
      currentCategory: '전체',
      currentContests: []
    };

    this.categories = [
      { id: 0, name: '전체' },
      { id: 1, name: '예정' },
      { id: 2, name: '진행' },
      { id: 3, name: '종료' }
    ];

    this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
  }

  id = 13; //state로 넣어도 될듯?

  componentWillMount() {
    this.callApi()
      .then(res => {
        this.setState({ 
          contests : res,
          currentContests : res
        })
      })
      .catch(err => console.log(err))
  }


  changeCurrentCategory = (selectedCategory) => {
    const { contests } = this.state;
    const category = this.categories.find(category => category.id === selectedCategory);
    /*{ id: 0, name: '전체' },
    { id: 1, name: '예정' },
    { id: 2, name: '진행' },
    { id: 3, name: '종료' }*/

    let startDate = new Date().getTime()
    let filtered = []

    if (category.id === 0) //all
      filtered = contests
    else if (category.id === 1) //not yet
      filtered = contests.filter(contest => new Date(contest.startTime).getTime() - startDate >= 0)
    else if (category.id === 2) //in progress
      filtered = contests.filter(contest => (new Date(contest.startTime).getTime() - startDate < 0) &&
        (new Date(contest.startTime).getTime() - startDate >= (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))
    else //done
      filtered = contests.filter(contest => (new Date(contest.startTime).getTime() - startDate < 0) &&
        (new Date(contest.startTime).getTime() - startDate < (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))

    this.setState({
      currentCategory: category.name,
      currentContests: filtered
    })
  }

  parentCallback = (dataFromChild) => {
    this.changeCurrentCategory(dataFromChild)
  }

  changeOrderOfList = (letMeGo, num) => {
    const { contests } = this.state;
    const contest = contests.find(contest => contest.id === letMeGo);

    if (contest.num === 0)
    {
      const removeHere = contests.indexOf(contest);
      var insertMe = contests.splice(removeHere, 1);

      console.log("@@@@ ING  " + contest.name);
      contests.push(contest);
      contest.num = 1;
    }
  }

  noticeWhenDone = (letMeGo, num) => {
    this.changeOrderOfList(letMeGo, num)
  }

  callApi = async () => {
    const response = await fetch('api/getcontestdata');
    const body = await response.json();
    //console.log(body)
    return body;
  }

  render() {
    const {
      handleToggle,
    } = this;
    const { currentContests } = this.state;

    return (
      <Fragment>
        <Logo />

        <Tab
          categories={this.categories}
          callbackFromParent={this.parentCallback}
        />

        <ListTemplate>
          <ItemList
            contests={currentContests}
            noticeWhenDone={this.noticeWhenDone}/>
        </ListTemplate>
      </Fragment>

    );
  }
}

export default App;