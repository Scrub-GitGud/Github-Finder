import React, {Fragment, useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from 'axios';

import './App.css';

import Navbar from './components/Navbar';
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/Alert'
import About from './components/pages/About'
import SingleUser from './components/users/SingleUser'

const App = () => {

  const [usersData, setUsersData] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);


  useEffect( () => {
    async function load_initial_users() {
      setLoading(true);
      const github_users = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
      setUsersData(github_users.data)
      setLoading(false);
    }
    load_initial_users();

    // this comment removes a warning
    // eslint-disable-next-line
  }, [])

  // This Runs when component mounts | Searchs for 20 default user
  // async componentDidMount() {
  //   this.setState({ loading:true });
  //   const github_users = await axios.get(`https://api.github.com/users?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
  //   this.setState({ usersData: github_users.data, loading: false})    
  // }

  // Search Github User
  const SearchUser = async (input_value) => {
    setLoading(true);
    const searched_users = await axios.get(`https://api.github.com/search/users?q=${input_value}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    setUsersData(searched_users.data.items)
    setLoading(false);
  }

  // Get Single Github User
  const getSingleUser = async (username) => {
    setLoading(true);
    const single_users = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    setSingleUser(single_users.data)
    setLoading(false);
  }

  // Get User Repos
  const getUserRepos = async (username) => {
    setLoading(true);
    const userRepos = await axios.get(`https://api.github.com/users/${username}/repos?sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`);
    setRepos(userRepos.data)
    setLoading(false);
  }

  // Alert System
  const SetAlertFunc = (msg, type) => {
    setAlert({msg: msg, type: type})

    setTimeout(() => { setAlert(null) }, 1000)
  }
  
  return (
    <BrowserRouter>
      <Fragment>
        <Navbar icon ="fab fa-github" title="Github Finder"/>
        <Alert alert={alert} />

        <Switch>
          <Route exact path='/' render={(props) => (
            <Fragment>
              <div className="container">
                <Search searchUsersProp={SearchUser} setAlertProp={SetAlertFunc} />
                <Users usersData={usersData} loading={loading} />
              </div>
            </Fragment>
          )} />

          <Route exact path='/about' component={About} />

          <Route exact path='/user/:login' render={(props) => (
            <SingleUser 
              {...props} // {...props} --> [spread operator] whatever props are passed in, we need to add those.
              getSingleUserProp={getSingleUser} 
              getUserReposProp={getUserRepos} 
              singleUserProp={singleUser} 
              reposProp={repos} 
              loading={loading} 
            />
          )} />
        </Switch>

      </Fragment>
    </BrowserRouter>
  );
}

export default App;
