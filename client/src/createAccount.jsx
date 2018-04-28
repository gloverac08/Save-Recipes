import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button, Modal, Form, Message, Header } from 'semantic-ui-react';


class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: '',
      usernameError: false,
      passwordError: false
    }
  }

  handleChange(e, name) {
    console.log('data: from handleChange', e.target.value);
    this.setState({
      [name]: e.target.value
    });
  }

  validatePassword() {
    return this.state.password1 === this.state.password2;
  }

  createAccount() {
    axios.post('/createAccount', {
      username: this.state.username,
      password: this.state.password1
    })
      .then(res => {
        this.props.login(res.data);
      })
      .catch(err => {
        console.log('error in post/createAccount:', err);
        this.setState({
          usernameError: true
        })
      });
  }

  render() {
    const styles = {
      button: {
        margin: 10
      }
    };

    return (
      <Modal
        trigger={<Button
            style={styles.button}
            color='teal'
            size='medium'
            >Create Account
          </Button>}
        closeIcon>
        <Header content='Create Account' />
        <Modal.Content>
          <Form error>
            <Form.Field>
              <label>Username</label>
              <input
                placeholder='username'
                onChange={(e) => {this.handleChange(e, 'username'); this.state.usernameError ? this.setState({usernameError: false}) : null}}
              />
            </Form.Field>
            {this.state.usernameError ? 
              <Message
                error
                content='Username already taken. Please choose a unique username.'
              /> : null}
            <Form.Field>
              <label>Password</label>
              <input
                placeholder='Password'
                onChange={(e) => {this.handleChange(e, 'password1'); this.state.passwordError ? this.setState({passwordError: false}) : null}}
              />
              <Form.Field>
                <label>Re-enter Password</label>
                <input
                  placeholder='Re-enter password'
                  onChange={(e) => {this.handleChange(e, 'password2'); this.state.passwordError ? this.setState({passwordError: false}) : null}}
                />
                {this.state.passwordError ? 
                  <Message
                    error
                    content='Passwords must match'
                  /> : null}          
              </Form.Field>
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button type='submit' onClick={() => {this.validatePassword() ? this.createAccount() : this.setState({passwordError: true})}}>Submit</Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default CreateAccount;