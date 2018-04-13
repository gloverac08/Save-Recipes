import React from 'react';
import { Card, Image } from 'semantic-ui-react';

const ListItem = (props) => (
  
  <div>
    {console.log('props:', props)}
    <Card>
      <Image src={props.favItem.image} />
      <Card.Content>
        <Card.Header>
          {props.favItem.title}
        </Card.Header>
        <Card.Meta>
          <span>
            Source: {props.favItem.source}
          </span>
        </Card.Meta>
        <Card.Description>
          Ingredients: {props.favItem.ingredients}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a href={props.favItem.link} target="_blank">See the full recipe</a>
      </Card.Content>
    </Card>
  </div>
)

export default ListItem;