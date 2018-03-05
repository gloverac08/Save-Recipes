import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Card, Icon, Image, Header, Segment, Input, Button, Modal, Form, Checkbox } from 'semantic-ui-react';
import SearchList from './searchList.jsx';
import List from './list.jsx';
import Search from './search.jsx';

// import AnyComponent from './components/filename.jsx'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      user: 'sample',
      searchItems: '',
      favorties: null,
      submittedUsername: '',
      submittedPassword: ''
  	}
  }

  componentDidMount () {
    // this.createAccount('amy', 'kitty');
    // this.search('wine');
    this.getFavorites();
    // this.login('sample', 'sample');
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
      username: this.state.submittedUsername,
      password: this.state.submittedPassword
    })
      .then(res => {
        console.log('res from post/login:', res.data);
        this.setState({
          user: res.data
        }, () => {
          console.log('this.state.user:', this.state.user);
          this.getFavorites()
          // this.addToFavs(this.state.searchItems[2]);
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

  handleChange(e, name) {
    console.log('data: from handleChange', e.target.value);
    this.setState({ 
      [name]: e.target.value 
    }, () => {
      console.log('this.state.submittedUsername:', this.state.submittedUsername);
    })
  }


  render () {
    const styles = {
      main: {
        backgroundColor: '#e3e6eb',
        // marginBottom: 10
      },
      header: {
        backgroundColor: '#f57f6a'
      },
      segment: {
        color: '#eef0f0',
        fontSize: 30,
        fontStyle: 'italic'
      },
      grid: {
        marginLeft: 40
      },
      button: {
        margin: 10
      }
    }

    return (
      <div style={styles.main}>
        <Segment style={styles.header} clearing>
          <Header as='h2' floated='right' style={styles.segment}>
            {(this.state.user === 'sample') ? 
            <span>
                <Modal trigger={<Button style={styles.button} color='teal' size='medium'>Login</Button>} closeIcon>
                  <Header content='Login' />
                  <Modal.Content>
                    <Form>
                      <Form.Field>
                        <label>Username</label>
                        <input 
                          placeholder='username' 
                          name='submittedUsername'
                          onChange={(e) => this.handleChange(e, 'submittedUsername')}  
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input 
                          placeholder='Password'
                          name='submittedPassword'
                          onChange={(e) => this.handleChange(e, 'submittedPassword')}
                         />
                      </Form.Field>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button type='submit' onClick={this.login.bind(this)}>Submit</Button>
                  </Modal.Actions>
                </Modal>
              <Button 
                style={styles.button} 
                color='teal' 
                size='medium'
                onClick={this.createAccount}
                >Create Account
                </Button> 
            </span>
            :
            <span>
              <Button style={styles.button} color='teal' size='medium'>View Favorites</Button>
              <Button style={styles.button} color='teal' size='medium'>Logout</Button>
            </span>
            }
          </Header>
          <Header as='h2' floated='left' style={styles.segment}>
            Recipe Collect
           </Header>
        </Segment>
        <div>
          <Search search={this.search.bind(this)}/>
        </div>
        <div style={styles.grid}>
          {this.state.favorites ? 
            <div style={styles.main}>
              <List favItems={this.state.favorites} />
            </div>
            :
            <div></div>}
        </div>
        <div style={styles.grid}>
          {this.state.searchItems ?
            <div >
            <SearchList searchItems={this.state.searchItems} addToFavs={this.addToFavs.bind(this)} />
            </div>
            :
            <div></div>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));