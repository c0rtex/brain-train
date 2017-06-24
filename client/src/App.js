import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    // Test API
    fetch('agents')
      .then(function(response) {
        return response.json();
      }).then(function(json) {
        console.log('parsed json', json);
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
              <li className="active"><a href="#">Overview</a></li>
              <li><a href="#">Agents</a></li>
              <li><a href="#">Chats</a></li>
              <li><a href="#">Categories</a></li>
            </ul>
          </div>
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h1 className="page-header">Overview</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
