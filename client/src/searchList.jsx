import React from 'react';
import ReactDOM from 'react-dom';
import SearchListEntry from './searchListEntry.jsx'
import { Grid } from 'semantic-ui-react';

const SearchList = (props) => (
  <div>
    <Grid divided='vertically'>
      <Grid.Row columns={4}>
        {props.searchItems.map((item, index) => 
          <Grid.Column>
            <SearchListEntry user={props.user} searchItem={item} addToFavs={props.addToFavs} key={index} />
          </Grid.Column>
        )}
      </Grid.Row>
    </Grid>
  </div>
)

export default SearchList;