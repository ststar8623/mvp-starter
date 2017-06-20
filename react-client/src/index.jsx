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
      artists: [],
      artist: ''
    };
    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateChange = this.updateChange.bind(this);
  }

  componentDidMount() {
    let that = this;
    $.ajax({
      url: '/database',
      method: 'GET',
      success: (data) => {
        console.log(data);
        let artists = this.state.artists;
        data.forEach(artist => {
          artists.push(artist.artist.name);
        });
        this.setState({
          artists: artists
        });
      }
    })
  }

  handleChange(e) {
    this.setState({
      artist: e.target.value
    });
  }

  updateChange(e) {
    e.preventDefault();
    let that = this;
    $.ajax({
      url: '/database',
      method: 'GET',
      data: {
        artist: e.target.innerText
      },
      success: (data) => {
        console.log("updateChange: ", data);
        that.setState({
          albums: data[0].artist.albums
        })
      }
    })
  }

  search() {
    let that = this;
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {
        artist: this.state.artist
      },
      success: (data) => {
        console.log(' successful sent!!');
        let newArtist = this.state.artists;
        console.log(data);
        console.log(data[0]);
        console.log(data[0].artist);
        if (newArtist.includes(data[0].artist.name)) {
          that.setState({
            albums: data[0].artist.ablums
          });
        } else {
          newArtist.push(data[0].artist.name);
          that.setState({
            albums: data[0].artist.albums,
            artists: newArtist
          });
        }
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }
  
  render () {
    return (<div>
      <h1>Your Favorite Songs</h1>
      <Search handleChange={this.handleChange} search={this.search} />
      <List artists={this.state.artists} albums={this.state.albums} updateChange={this.updateChange}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));