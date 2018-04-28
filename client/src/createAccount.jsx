import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Card, Icon, Image, Header, Segment, Input, Button, Modal, Form, Checkbox } from 'semantic-ui-react';


class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password1: '',
      password2: ''
    }
  }

  handleChange(e, name) {
    console.log('data: from handleChange', e.target.value);
    this.setState({
      [name]: e.target.value
    })
  }

  validatePassword() {
    return this.state.password1 === this.state.password2;
  }

  render() {
    const styles = {
      button: {
        margin: 10
      }
    }

    return (
      <div>
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
                  onChange={(e) => this.handleChange(e, 'password1')}
                />
                <Form.Field>
                  <label>Re-enter Password</label>
                  <input
                    placeholder='Re-enter password'
                    onChange={(e) => { this.props.validatePassword() ? this.handleChange(e, 'password2') : null }}
                  />
                </Form.Field>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button type='submit' onClick={this.props.createAccount.bind(this)}>Submit</Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

export default CreateAccount;