import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: ''
    }
  };

  handleChange(e) {
    this.setState({
      artist: e.target.value
    });
  }

  search() {
    this.props.handleChange(this.state.artist);
  }

  render() {
    return (
      <div>
        <input onChange={this.handleChange.bind(this)} ></input>
        <input type="submit" onClick={this.search.bind(this)}></input>
      </div>
    )
  }
}

export default Search;