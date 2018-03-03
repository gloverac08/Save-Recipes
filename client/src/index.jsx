import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      user: 'amy',
      searchItems: ''
  	}
  }

  componentDidMount () {
    // this.createAccount('amy', 'kitty');
    this.search('apples');
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
          this.addToFavs(this.state.searchItems[0]);
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

  render () {
  	return (<div>Hello World</div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));