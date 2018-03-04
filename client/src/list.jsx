import React from 'react';
import ListItem from './listItem.jsx';
import { Grid } from 'semantic-ui-react';

const List = (props) => (
  <div>
    <Grid divided='vertically'>
      <Grid.Row columns={4}>
        {props.favItems.map((item, index) =>
          <Grid.Column>
            <ListItem favItem={item} key={index} />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  </div>
)

export default List;