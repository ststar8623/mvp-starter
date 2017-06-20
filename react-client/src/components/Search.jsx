import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <input onChange={this.props.handleChange} ></input>
        <input type="submit" onClick={this.props.search} ></input>
      </div>
    )
  }
}

export default Search;