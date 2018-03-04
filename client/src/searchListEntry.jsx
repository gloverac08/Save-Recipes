import React from 'react';
import { Card, Image } from 'semantic-ui-react';

class SearchListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: this.props.searchItem
    }
  }

  componentDidMount() {
    console.log('this.state.searchItem.ingredients:', this.state.searchItem.ingredients);
  }

  clickHandler() {
    this.props.addToFavs(this.state.searchItem);
  }


  render() {
    return (
      <div>
      <Card>
        <Image src={this.state.searchItem.image} />
        <Card.Content>
          <Card.Header>
            {this.state.searchItem.title}
          </Card.Header>
          <Card.Meta>
            <span>
              Source: {this.state.searchItem.source}
            </span>
          </Card.Meta>
          <Card.Description>
            Ingredients: {this.state.searchItem.ingredients.join().slice(0, 120) + '...'}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a href={this.state.searchItem.link} target="_blank">See the full recipe</a>
        </Card.Content>
      </Card>
      </div>
    )
  }
}

export default SearchListEntry;