import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Agents from './Agents';
import Chats from './Chats';
import './App.css';

const Overview = () => (
  <div>
    <h1 className="page-header">Overview</h1>
    <p>Welcome to Brain Train.</p>
  </div>
);

const Categories = () => (
  <h1 className="page-header">Categories</h1>
);

class App extends Component {

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3 col-md-2 sidebar">
              <ul className="nav nav-sidebar">
                <li><Link to="/">Overview</Link></li>
                <li><Link to="/agents">Agents</Link></li>
                <li><Link to="/chats">Chats</Link></li>
                <li><Link to="/categories">Categories</Link></li>
              </ul>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
              <Switch>
                <Route exact path="/" component={Overview} />
                <Route path="/agents" component={Agents} />
                <Route path="/chats" component={Chats} />
                <Route path="/categories" component={Categories} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
