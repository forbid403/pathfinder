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

/*
  componentWillMount = async () => {
    const contests = [
      { id: 0, image: 0, name: 'Leetcode Weekly Contest', date: "2020-01-18 23:32:00", time: 0.5, checked: false },
      { id: 1, image: 1, name: 'TopCoder Codding Contest', date: "2020-01-19 18:20:00", time: 2, checked: true },
      { id: 2, image: 2, name: 'ILoveProgramming Algorithm Contest', date: "2020-03-24 12:00:00", time: "1.5", checked: false },
      { id: 3, image: 0, name: 'Codding Contest', date: "2020-03-31 12:40:00", time: 1.5, checked: false },
      { id: 4, image: 0, name: 'Come On Contest', date: "2020-02-12 12:00:00", time: 1.5, checked: false },
      { id: 5, image: 2, name: 'Hardest Ever Codding Contest', date: "2020-02-15 12:00:00", time: 1.5, checked: false },
      { id: 6, image: 0, name: 'Welcome New Personal Contest', date: "2020-03-02 12:00:00", time: 1.5, checked: false },
      { id: 7, image: 2, name: 'Korea Algorithm Contest', date: "2020-01-19 03:00:00", time: 1.5, checked: false },
      { id: 8, image: 1, name: 'Conventinal BST Contest', date: "2020-01-19 02:30:00", time: 1.5, checked: false },
      { id: 9, image: 0, name: 'Hollywood Wow Cheese Contest', date: "2020-02-01 12:00:00", time: 1.5, checked: false },
      { id: 10, image: 0, name: 'ILoveChicken And Juice And Apple Contest', date: "2020-01-24 12:00:00", time: 1.5, checked: false },
      { id: 11, image: 2, name: "I'm Hungry But It's Okay", date: "2020-01-02 12:00:00", time: 1.5, checked: false },
      { id: 12, image: 1, name: 'Algorithm JeaMitDda Algorithm Study', date: "2020-02-18 12:00:00", time: 1.5, checked: false },
    ]
    this.setState({
      currentContests: contests
    })
  }

  handleCreate = () => {
    const { input, contests } = this.state;
    this.setState({
      input: '', //input 비워주고 concat을 사용해 배열에 추가 (?)
      contests: contests.concat({
        id: this.id++,
        text: input,
        checked: false
      })
    });
  }
 */

  handleToggle = (id) => {

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


  callApi = async () => {
    const response = await fetch('api/getcontestdata');
    const body = await response.json();
    //console.log(body)
    return body;
  }


  render() {
    const { input, contests, categories, selected } = this.state;
    const {
      changeCurrentCategory,
      handleCreate,
      handleToggle,
    } = this;
    const { currentContests, currentCategory } = this.state;

    return (
      <Fragment>
        <Logo />

        <Tab
          categories={this.categories}
          callbackFromParent={this.parentCallback}
        />

        <ListTemplate>
          <ItemList contests={currentContests} onToggle={handleToggle} />
        </ListTemplate>
      </Fragment>

    );
  }
}

export default App;