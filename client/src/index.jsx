import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Card, Icon, Image } from 'semantic-ui-react';
import SearchList from './searchList.jsx';
import List from './list.jsx';
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      user: '',
      searchItems: '',
      favorties: null
  	}
  }

  componentDidMount () {
    // this.createAccount('amy', 'kitty');
    this.search('apples');
    // this.login('amy', 'kitty');
  }

  search(query) { // this is still working
    axios.post('/search', { 
      'q': query 
    })
      .then(res => {
        this.setState({
          searchItems: res.data
        }, () => {
          console.log('this.state.searchItems:', this.state.searchItems);
        });
      })
      .catch(err => {
        console.log('err in search:', err);
      });
  }

  createAccount (username, password) { 
    axios.post('/createAccount', {
      username: username,
      password: password
    })
      .then(res => {
        console.log('res from post/createAccount:', res.data);
        this.setState({
          user: res.data
        })
        // call get favs now
      })
      .catch(err => {
        console.log('error in post/createAccount:', err);
      });
  }

  login (username, password) {
    axios.post('/login', {
      username: username,
      password: password
    })
      .then(res => {
        console.log('res from post/login:', res.data);
        this.setState({
          user: res.data
        }, () => {
          console.log('this.state.user:', this.state.user);
          this.getFavorites()
        })
      })
      .catch(err => {
        console.log('error in post/login:', err);
      })
  }

  logout () {
    this.setState({
      user: ''
    }, () => {
      console.log('this.state.user:', this.state.user);
    })
  }
    
 

  addToFavs (recipe) {
    axios.post('/saveRecipe', {
      username: this.state.user,
      recipe: recipe
    })
      .then(res => {
        console.log('res from post/saveRecipe:', res.data);
      })
      .catch(err => {
        console.log('err in post/saveRecipe:', err);
      })
  }

  getFavorites () {
    axios.post('/getFavorites', {
      username: this.state.user
    })
      .then(res => {
        console.log('res.data from post/getFavorites:', res.data);
        this.setState({
          favorites: res.data
        }, () => {
          console.log('this.state.favorites:', this.state.favorites);
        })
      })
      .catch(err => {
        console.log('err in post/getFavorites:', err);
      })
  }

  render () {
    const styles = {
      main: {
        backgroundColor: '#e3e6eb'
      }
    }
    if (this.state.favorites) {
      return (
        <div style={styles.main}>
          <List favItems={this.state.favorites} />
        </div>
      )
    } else if (this. state.searchItems) {
      return (
        <div style={styles.main}>
        <SearchList searchItems={this.state.searchItems} addToFavs={this.addToFavs.bind(this)} />
        </div>
      )
    } else {
      return (
        <div>
          <div>Hello World</div>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));