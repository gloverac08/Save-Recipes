import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import { Card, Icon, Image, Header, Segment, Input, Button, Modal, Form, Checkbox } from 'semantic-ui-react';
import SearchList from './searchList.jsx';
import List from './list.jsx';
import Search from './search.jsx';
import CreateAccount from './createAccount.jsx';
import Login from './login.jsx';


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      user: 'sample',
      searchItems: '',
      favorties: null,
      secondPassword: '',
      sampleSearch: '',
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

  login(username) {
    this.setState({
      user: username
    }, () => {
      this.getFavorites();
    })
  }

  logout () {
    this.setState({
      user: 'sample'
    })
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


  render () {
    const styles = {
      main: {
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
                <Login 
                  login={this.login.bind(this)}
                />
                <CreateAccount
                  login={this.login.bind(this)}
                />
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