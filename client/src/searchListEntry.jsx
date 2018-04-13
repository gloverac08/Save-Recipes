import React from 'react';
import axios from 'axios';
import { Card, Image, Button, Icon, Popup } from 'semantic-ui-react';

class SearchListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false
    }
  }

  componentDidMount() {
    console.log('this.props.user:', this.props.user);
  }

  addToFavs(recipe) {
    axios.post('/saveRecipe', {
      username: this.props.user,
      recipe: this.props.searchItem
    })
      .then(res => {
        console.log('res from post/saveRecipe:', res.data);
        this.setState({
          showPopup: true
        }, () => {

        })
      })
      .catch(err => {
        console.log('err in post/saveRecipe:', err);
      })
  }

  render() {
    return (
      <div>
        <Card>
          <Image src={this.props.searchItem.image} />
          <Card.Content>
            <Card.Header>
              {this.props.searchItem.title}
            </Card.Header>
            <Card.Meta>
              <span>
                Source: {this.props.searchItem.source}
              </span>
            </Card.Meta>
            <Card.Description>
              Ingredients: {this.props.searchItem.ingredients.join().slice(0, 120) + '...'}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a href={this.props.searchItem.link} target="_blank">See the full recipe</a>
            {this.props.user !== 'sample' ? 
              <Popup
                trigger={<Button
                  icon
                  style={{ float: 'right' }}
                  onClick={this.addToFavs.bind(this)}
                  >
                  <Icon name='like' />
                </Button>}
                content='Add to your favorites'
              /> : null}
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default SearchListEntry;