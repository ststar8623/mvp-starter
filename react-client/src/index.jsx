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
    this.removeChange = this.removeChange.bind(this);
  }

  componentDidMount() {
    let that = this;
    $.ajax({
      url: '/database',
      method: 'GET',
      success: (data) => {
        console.log(data);
        let artists = that.state.artists;
        data.forEach(artist => {
          artists.push(artist.artist.name);
        });
        that.setState({
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

  removeChange(e) {
    let that = this;
    that.setState({
      albums: [],
      artists: that.state.artists.filter(el=> {
        return el !== e;
      })
    });
    $.ajax({
      url: '/remove',
      method: 'POST',
      data: {
        artist: e
      },
      success: function(data) {
        console.log('successful remove artist from database');
      }
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
        });
      }
    })
  }

  search() {
    let that = this;
    $.ajax({
      url: '/search',
      method: 'GET',
      data: {
        artist: that.state.artist
      },
      success: (data) => {
        console.log(' successful sent!!');
        console.log('searched back data: ', data.artist.name);
        if (!that.state.artists.includes(data.artist.name)) {
          let newArray = that.state.artists;
          newArray.push(data.artist.name);
          that.setState({
            artists: newArray
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
      <h1>Your Favorite Spotifies</h1>
      <Search handleChange={this.handleChange} search={this.search} />
      <List artists={this.state.artists} albums={this.state.albums} updateChange={this.updateChange} removeChange={this.removeChange}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));