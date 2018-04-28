import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Header, Button, Modal, Form, Message } from 'semantic-ui-react';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: false
    };
  }

  handleChange(e, name) {
    this.setState({
      [name]: name
    });
  }

  login() {
    axios.post('/login', {
      username: this.state.username,
      password: this.state.password
    })
      .then(res => {
        console.log('this.state.user:', this.state.user);
        this.props.login(res.data);
      })
      .catch(err => {
        this.setState({
          error: true
        })
        console.log('error in post/login:', err);
      })
  }

  render() {
    const styles = {
      button: {
        margin: 10
      }
    };

    return (
      <Modal trigger={<Button style={styles.button} color='teal' size='medium'>Login</Button>} closeIcon>
        <Header content='Login' />
        <Modal.Content>
          <Form error>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder='username'
                name='submittedUsernameLogin'
                onChange={(e) => {this.handleChange(e, 'username'); this.state.error ? this.setState({error: false}) : null}}
              />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password'
                name='submittedPasswordPassword'
                onChange={(e) => {this.handleChange(e, 'password'); this.state.error ? this.setState({error: false}) : null}}
              />
            </Form.Field>
            {this.state.error ?
              <Message
                error
                content='Invalid Credentials'
              /> : null}   
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' onClick={this.login.bind(this)}>Submit</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Login;


