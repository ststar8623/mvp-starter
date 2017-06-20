import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      albums: [],
      artist: ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.updateArtist();
  }

  updateArtist() {
    $.ajax({
      url: '/database', 
      method: 'GET',
      data: {
        artist: this.state.artist
      },
      success: (data) => {
        console.log('dataaaaaa', data);
        this.setState({
          albums: data[0].artist.albums,
          artist: data[0].artist.name
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange(e) {
    this.setState({
      artist: e
    });
    this.updateArtist();
    this.search(e);
  }

  search(e) {
    $.ajax({
      url: '/search',
      method: 'POST',
      data: {
        artist: e
      },
      success: (data) => {
        console.log(data + ' successful sent!!');
      }
    })
  }
  
  render () {
    return (<div>
      <h1>Your Favorite Songs</h1>
      <Search handleChange={this.handleChange} />
      <List artist={this.state.artist} albums={this.state.albums} />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));