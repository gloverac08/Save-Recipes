import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Icon, Image, Header, Segment, Input, Button, Modal, Form, Checkbox } from 'semantic-ui-react';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    )
  }
}

export default Login;


