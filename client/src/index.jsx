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
      username: '',
      password: '',
      secondPassword: '',
      sampleSearch: ''
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

  createAccount () { 
    axios.post('/createAccount', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log('res from post/createAccount:', res.data);
        this.setState({
          user: res.data
        });
      })
      .catch(err => {
        console.log('error in post/createAccount:', err);
      });
  }

  login () {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
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
      user: 'sample'
    })
  }
    
  checkPassword () {
    return this.state.submitted2ndPasswordCreateAccount === this.state.submittedPasswordCreateAccount;
  }

  getFavorites () {
    axios.post('/getFavorites', {
      username: this.state.user
    })
      .then(res => {
        console.log('res.data from post/getFavorites:', res.data);
        if (this.state.user === 'sample') {
          this.setState({
            sampleSearch: res.data,
            favorites: res.data
          }, () => {
            console.log('this.state.favorites:', this.state.favorites);
          })
        } else if (!res.data.length) {
          this.setState({
            favorites: this.state.sampleSearch
          })
        } else {
          this.setState({
            favorites: res.data
          })
        }
      })
      .catch(err => {
        console.log('err in post/getFavorites:', err);
      })
  }

  handleChange(e, name) {
    console.log('data: from handleChange', e.target.value);
    this.setState({ 
      [name]: e.target.value 
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
                          name='submittedUsernameLogin'
                          onChange={(e) => this.handleChange(e, 'username')}  
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input 
                          placeholder='Password'
                          name='submittedPasswordPassword'
                          onChange={(e) => this.handleChange(e, 'password')}
                         />
                      </Form.Field>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button type='submit' onClick={this.login.bind(this)}>Submit</Button>
                  </Modal.Actions>
                </Modal>
                <Modal 
                  trigger={<Button
                    style={styles.button}
                    color='teal'
                    size='medium'
                    >Create Account
                      </Button> } 
                  closeIcon>
                  <Header content='Login' />
                  <Modal.Content>
                    <Form>
                      <Form.Field>
                        <label>Username</label>
                        <input
                          placeholder='username'
                          onChange={(e) => this.handleChange(e, 'username')}
                        />
                      </Form.Field>
                      <Form.Field>
                        <label>Password</label>
                        <input
                          placeholder='Password'
                            onChange={(e) => this.handleChange(e, 'password')}
                        />
                        <Form.Field>
                          <label>Re-enter Password</label>
                          <input
                            placeholder='username'
                              onChange={(e) => {this.checkPassword() ? this.handleChange(e, 'secondPassword') : null }}
                          />
                        </Form.Field>
                      </Form.Field>
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button type='submit' onClick={this.createAccount.bind(this)}>Submit</Button>
                  </Modal.Actions>
                </Modal>
            </span>
            :
            <span>
              <Button 
                style={styles.button} 
                color='teal' 
                size='medium'
                onClick={() => {this.getFavorites(); this.setState({searchItems: null})}}
                >View Favorites
              </Button>
              <Button 
                style={styles.button} 
                color='teal' 
                size='medium' 
                onClick={this.logout.bind(this)} 
                >Logout
              </Button>
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
          {this.state.favorites && !this.state.searchItems ? 
            <div style={styles.main}>
              <List favItems={this.state.favorites} />
            </div>
            :
            <div></div>}
        </div>
        <div style={styles.grid}>
          {this.state.searchItems ?
            <div >
            <SearchList 
              searchItems={this.state.searchItems} 
              user={this.state.user} 
            />
            </div>
            :
            <div></div>}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));