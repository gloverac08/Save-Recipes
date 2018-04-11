import React from 'react';
import { Input } from 'semantic-ui-react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
  }

  updateSearchState(event, data) {
    this.setState({
      searchText: data.value
    }, () => {
      // if (this.state.searchText.length > 3) {
      //   this.search(this.state.searchText);
      // }
      console.log('data from updateSearchState:', data.value);
    })
  }

  search() {
    console.log('clicked');
    this.props.search(this.state.searchText);
  }

  keyup(e) {
    if (e.keyCode === 13) {
      this.search();
    }
  }

  render() {
    const styles = {
      input: {
        marginBottom: 10,
          marginLeft: 40
      }
    }
    return (
      <div>
        <Input 
          style={styles.input} 
          size='large' 
          action={{ 
            icon: 'search',
            onClick: this.search.bind(this),
            onKeyPress: this.keyup.bind(this)
          }} 
          placeholder='Search...'
          onChange={(event, data) => {this.updateSearchState(event, data)}} 
          // onKeyup={(e) => {this.}}
          />
      </div>)

  }
}

export default Search;