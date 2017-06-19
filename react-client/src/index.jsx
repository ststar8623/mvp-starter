import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      artist: ''
    };

    this.search = this.search.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      method: 'GET',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  handleChange(e) {
    console.log('name: ', e)
    this.setState({
      artist: e
    });
  }

  search() {
    $.ajax({
      url: '',
      method: 'POST',
      success: (data) => {
        console.log(data + ' successful sent!!');
      }
    })
  }
  
  render () {
    return (<div>
      <h1>Item List</h1>
      <Search handleChange={this.handleChange} />
      <List />
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));