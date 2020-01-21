import React, { Component, Fragment } from 'react';
import ListTemplate from './components/ListTemplate';
import ItemList from './components/ItemList';
import Logo from './components/Logo'
import Tab from './components/Tab'
import SearchBar from './components/SearchBar'
import Header from './components/MyPage/Header';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            input: '',
            contests: [],
            currentCategory: '전체',
            currentContests: [],
            keyword: "",
            isLogin: false,
            onLogin: this.onLogin
        };


        this.categories = [
            { id: 0, name: '전체' },
            { id: 1, name: '예정' },
            { id: 2, name: '진행' },
            { id: 3, name: '종료' }
        ];

        this.changeCurrentCategory = this.changeCurrentCategory.bind(this);
    }

    componentWillMount() {
        this.callApi()
            .then(res => {
                this.setState({
                    contests: res,
                    currentContests: res
                })

                this.firstOrdering()
            })
            .catch(err => console.log(err))
    }

    changeCurrentCategory = (selectedCategory) => {
        const { contests } = this.state;
        const category = this.categories.find(category => category.id === selectedCategory);
        let startDate = new Date().getTime()
        let filtered = []

        if (category.id === 0) //all
            filtered = contests
        else if (category.id === 1) //not yet
            filtered = contests.filter(contest => new Date(contest.startTime.slice(0, -1)).getTime() - startDate >= 0)
        else if (category.id === 2) //in progress
            filtered = contests.filter(contest => (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < 0) &&
                (new Date(contest.startTime.slice(0, -1)).getTime() - startDate >= (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))
        else //done
            filtered = contests.filter(contest => (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < 0) &&
                (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))

        this.setState({
            currentCategory: category.name,
            currentContests: filtered
        })
    }

    parentCallback = (dataFromChild) => {
        this.changeCurrentCategory(dataFromChild)
    }

    noticeWhenChanged = (command, letMeGo, num) => {
        /*changeOrderOfList(command, letMeGo, num)*/
        const { contests } = this.state;
        const contest = contests.find(contest => contest._id === letMeGo);

        if (contest.num < 2) {
            const removeHere = contests.indexOf(contest);
            var insertMe = contests.splice(removeHere, 1);

            if (command === 0) //in progress
            {
                contests.unshift(contest);
                contest.num = 1;
            }
            else //done
            {
                contests.push(contest);
                contest.num = 2;
            }
        }
    }

    callApi = async () => {
        const response = await fetch('api/getcontestdata');
        const body = await response.json();
        return body;
    }

    firstOrdering() {
        const { contests, currentContests } = this.state;
        const startDate = new Date().getTime();
        let inProgress = [];
        let done = [];

        inProgress = contests.filter(contest => (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < 0) &&
            (new Date(contest.startTime.slice(0, -1)).getTime() - startDate >= (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))

        done = contests.filter(contest => (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < 0) &&
            (new Date(contest.startTime.slice(0, -1)).getTime() - startDate < (parseFloat(contest.duration) * (-1) * 1000 * 60 * 60)))

        inProgress.forEach((item) => {
            const contest = contests.find(contest => contest._id === item._id);

            const removeHere = contests.indexOf(contest);
            var insertMe = contests.splice(removeHere, 1);

            contests.unshift(contest);
            contest.num = 1;
        })

        done.forEach((item) => {
            const contest = contests.find(contest => contest._id === item._id);

            const removeHere = contests.indexOf(contest);
            var insertMe = contests.splice(removeHere, 1);

            contests.push(contest);
            contest.num = 1;
        })

        this.setState({ currentContests: contests })
    }
    showTitleSearchResult = (keywordFromChild) => {
        const searchedContests = this.state.contests.filter(contest =>
            contest.title.toLowerCase().includes(keywordFromChild.target.value.toLowerCase()))

        this.setState({ currentContests: searchedContests })
    }

    showDateRangeSearchResult = (from, to) => {
        const fromCompareMe = from.setHours(0, 0, 0, 0);
        const toCompareMe = to.setHours(0, 0, 0, 0);

        const searchedContests = this.state.contests.filter(contest =>
            (fromCompareMe <= new Date(contest.startTime).setHours(0, 0, 0, 0))
            && (new Date(contest.startTime).setHours(0, 0, 0, 0) <= toCompareMe)
        )

        this.setState({ currentContests: searchedContests })
    }
    componentDidMount() {
        const id = window.sessionStorage.getItem('id')
        if (id) {
            this.onLogin()
        }
    }

    onLogin = () => {
        this.setState({
            isLogin: true
        })
    }
    onLogOut = () => {
        this.setState({
            isLogin: false
        })
        //remove session
        window.sessionStorage.clear()

    }
    render() {
        const { currentContests, isLogin } = this.state;

        return (
            <div>
                <Header
                    isLogin={isLogin} 
                    onLogin={this.onLogin}
                    onLogOut={this.onLogOut} />

                <Fragment>
                    <Logo />
                    <SearchBar
                        showTitleSearchResult={this.showTitleSearchResult}
                        showDateRangeSearchResult={this.showDateRangeSearchResult}>
                    </SearchBar>

                    <Tab
                        categories={this.categories}
                        callbackFromParent={this.parentCallback}
                    />

                    <ListTemplate>
                        <ItemList
                            contests={currentContests}
                            noticeWhenChanged={this.noticeWhenChanged} />
                    </ListTemplate>
                </Fragment>


            </div>


        );
    }
}

export default Home;